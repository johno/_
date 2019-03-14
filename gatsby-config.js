module.exports = {
  siteMetadata: {
    title: 'johno'
  },
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-digital-garden',
      options: {
        postsPath: '/writing',
        notesPath: '/txt'
      }
    }
  ]
}
