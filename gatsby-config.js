module.exports = {
  siteMetadata: {
    title: 'johno',
    siteUrl: 'https://johno.com'
  },
  plugins: [
    // 'gatsby-plugin-component-graph',
    {
      resolve: 'gatsby-theme-austere',
      options: {
        basePath: '/writing/archives'
      }
    },
    {
      resolve: 'gatsby-theme-blog-tags',
      options: {
        basePath: '/writing/tags'
      }
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: 'FFYAPMRP'
      }
    },
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        mdx: false,
        contentPath: 'content/decks',
        basePath: '/decks'
      }
    }
  ]
}
