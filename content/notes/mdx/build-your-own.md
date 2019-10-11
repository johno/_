# Build your own

> Understand ASTs by implementing your own MDX

## Goals

Write your own plugin: https://mdxjs.com/guides/writing-a-plugin

## Demo

End goal is to implement a renderer for design system documentation that supports:

- Inline components
- Live code editor
- Imports

## Concepts

- Abstract syntax trees
- Tokenization => AST => transpilation => compilation
- Plugin architectures
- remark/rehype/babel/mdx/codeshift/prettier all use plugins to transform ASTs
- have a new tool at your disposal to implement complex tasks like a babel macro, code shifting,
