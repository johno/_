const path = require('path')

module.exports = {
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'GatsbyPluginComponentGraphData',
        path: path.resolve(
          process.cwd(),
          '.cache/gatsby-plugin-component-graph'
        )
      }
    }
  ]
}
