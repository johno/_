module.exports = {
  siteMetadata: {
    title: 'johno'
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
    }
  ]
}
