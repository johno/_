const visit = require('unist-util-visit')
const { transform } = require('@babel/standalone')
const babelPluginSyntaxJsx = require('@babel/plugin-syntax-jsx')
const { declare } = require('@babel/helper-plugin-utils')

class BabelPluginGetTagName {
  constructor() {
    this.state = { tags: [] }
    this.plugin = declare(api => {
      api.assertVersion(7)

      return {
        visitor: {
          JSXOpeningElement: ({ node }) => {
            if (node.name && node.name.name === 'Tag') {
              const tag = node.attributes.find(
                attr => attr.name && attr.name.name === 'name'
              )

              if (tag) {
                this.state.tags.push(tag.value.value)
              }
            }
          }
        }
      }
    })
  }
}

const pluckTags = jsx => {
  const plugin = new BabelPluginGetTagName()

  try {
    transform(`<>${jsx}</>`, {
      plugins: [babelPluginSyntaxJsx, plugin.plugin]
    })
  } catch (e) {
    console.log(e)
    return []
  }

  return [...new Set(plugin.state.tags)]
}

module.exports = () => (tree, file) => {
  let allTags = []

  visit(tree, 'jsx', node => {
    allTags = [...allTags, ...pluckTags(node.value)]
  })

  file.data.tags = allTags
}
