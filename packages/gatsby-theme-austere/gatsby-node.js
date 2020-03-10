const { createContentDigest } = require(`gatsby-core-utils`)

exports.sourceNodes = (
  { actions: { createTypes, createNode }, schema },
  { withDarkMode = false }
) => {
  createTypes(`type AustereOptions implements Node {
withDarkMode: Boolean!
}`)

  const austereOptions = {
    withDarkMode
  }

  createNode({
    ...austereOptions,
    id: `gatsby-theme-austere-options`,
    parent: null,
    children: [],
    internal: {
      type: `AustereOptions`,
      contentDigest: createContentDigest(austereOptions),
      content: JSON.stringify(austereOptions),
      description: `Austere Options`,
    },
  })
}