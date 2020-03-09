module.exports = options => {
  return {
    plugins: [
      {
        resolve: 'gatsby-theme-blog-core',
        options
      },
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-react-helmet',
      {
        resolve: 'gatsby-plugin-sitemap',
        options: {
          exclude: [
            '/confirm',
            '/confirmed'
          ]
        }
      }
    ]
  }
}
