# remark-mdx

March 25th, 2019

The [MDX](https://github.com/mdx-js/mdx) library is built on
[remark](https://github.com/remarkjs/remark) and
[unified](https://github.com/unifiedjs/unified).

I initially chose remark because of its robust ecosystem of plugins
and interoperable syntaxes. The unified system handles:

- Markdown
- HTML
- Natural text
- ...and now MDX!

In the long term I knew this type of ecosystem would be necessary
for a format based around content. You can do anything from linting syntax,
to suggesting better alternatives to offensive words, to automatically
inserting apostrophes. As such, I knew it would be the best framework
to begin building on.

Interestingly enough, the [core of MDX](https://github.com/mdx-js/mdx/tree/master/packages/remark-mdx)
is implemented _as_ a remark plugin.

## How does it work?

The unified flow consists of three phases:

- parsing
- applying plugins
- compiling

### Parsing

Parsing turns a string (document) into an Abstract Syntax Tree (AST).
This is achieved by tokenizing the string and creating linked nodes.

### Applying plugins

Plugins receive an AST and then perform modifications to the tree.
They can even _transform_ from one syntax to another.

### Compiling

A compiler turns an AST back into a string.

## Usage in MDX

`remark-mdx` is the syntactic extension which allows remark to understand
the MDX syntax. This is used because remark doesn't have know what import,
export, and JSX nodes are.

### Extending the parser

Firstly, `remark-mdx` extends the tokenizers. The unified ecosystem adds
`blockTokenizers`, `inlineTokenizers`, and `blockMethods` to the prototype
chain which plugins can tap into.

`remark-mdx` first overrides the `blockTokenizers` for HTML with a custom
block handler which takes care of parsing of HTML blocks. It's mostly a copied
and pasted with a few tokenizer changes because HTML is syntactically different
than JSX.

Then inline tokenization is extended. Firstly, the original remark tokenizer
is also changed because of the differences between HTML and JSX syntax, but then
there's also handling added in for parsing imports and exports.

Import and export handling even pulls in [babel](https://babeljs.io) so that
parsing is as robust as possible. There are scenarios where an import and export
can be separated only by a single line which remark reads as one "block".

```js
import Layout from './Layout'
export default Layout
```

With remark, blocks are nodes that are separated by an empty line. This is why
we

All together the customized parser (as a plugin) looks like:

```js
function attachParser(parser) {
  const blocks = parser.prototype.blockTokenizers
  const inlines = parser.prototype.inlineTokenizers
  const methods = parser.prototype.blockMethods

  blocks.esSyntax = tokenizeEsSyntax
  blocks.html = wrap(block)
  inlines.html = wrap(inlines.html, inlineJsx)

  methods.splice(methods.indexOf('paragraph'), 0, 'esSyntax')

  // ...
}
```

As you can see above, we're taking the remark defaults and mixing in a bit
of extra stuff that we need for MDX syntax.

The last line is interesting because we're overriding the `blockMethods`.
This is so that the es syntax tokenizer is used _before_ the paragraph
tokenizer which is how we parse out import/export statements.

```js
function tokenizeEsSyntax(eat, value) {
  const index = value.indexOf(EMPTY_NEWLINE)
  const subvalue = index !== -1 ? value.slice(0, index) : value

  if (isExport(subvalue) || isImport(subvalue)) {
    const nodes = extractImportsAndExports(subvalue)
    nodes.map(node => eat(node.value)(node))
  }
}
```

### Extending the compiler

In `remark-mdx` we also extend the compiler so that we don't introduce
new nodes that the default compiler (`remark-stringify`) can't handle.
unified will raise an error if the AST contains a node type that doesn't
have an associated compiler which would happen with import, export, and
jsx nodes.

We do this by extending the compiler's `visitors`. This is the function
that is invoked when each node is visited during the compilation phase.
It's expected to return a string, and all those strings are combined
together.

```js
function attachCompiler(compiler) {
  const proto = compiler.prototype

  proto.visitors = Object.assign({}, proto.visitors, {
    import: stringifyEsSyntax,
    export: stringifyEsSyntax,
    jsx: stringifyEsSyntax
  })
}

function stringifyEsSyntax(node) {
  return node.value.trim()
}
```

As you can see above, `stringifyEsSyntax` doesn't do anything besides
returning the original contents from the tokenization phase.

### All together

The actual plugin we expose is a lot simpler than what's happening
at the parser/compiler level. We check for the existence of the parser
and compiler. If they're present with the attributes we need, we
attach them.

```js
function mdx() {
  const parser = this.Parser
  const compiler = this.Compiler

  if (parser && parser.prototype && parser.prototype.blockTokenizers) {
    attachParser(parser)
  }

  if (compiler && compiler.prototype && compiler.prototype.visitors) {
    attachCompiler(compiler)
  }
}
```
