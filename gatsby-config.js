module.exports = {
  siteMetadata: {
    title: 'johno'
  },
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-digital-garden',
      options: {
        notesPath: '/txt',
        mdxLayouts: {
          default: require.resolve('gatsby-theme-digital-garden/src/components/layout')
        }
      }
    },
    {
      resolve: 'gatsby-theme-digital-garden-blog',
      options: {
        postsPath: '/writing'
      }
    }
  ]
}
