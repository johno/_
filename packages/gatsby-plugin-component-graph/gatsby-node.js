const fs = require('fs')
const path = require('path')

const dataDirectory = '.cache/gatsby-plugin-component-graph'
const filePath = path.resolve(
  process.cwd(),
  dataDirectory,
  'imports-by-component.json'
)

class GatsbyComponentGraphPlugin {
  importsByComponent = {}
  srcPath = null

  constructor({ projectRoot }) {
    this.srcPath = path.join(projectRoot, 'src')
  }

  apply(resolver) {
    resolver.hooks.rawFile.tapAsync(
      'GatsbyComponentGraphPlugin',
      (request, _stack, callback) => {
        const isLocalModuleImport =
          request.path.startsWith(this.srcPath) &&
          request.context.issuer &&
          request.context.issuer.startsWith(this.srcPath)

        if (isLocalModuleImport) {
          const relativePath = path.relative(this.srcPath, request.path)
          const relativeIssuerPath = path.relative(
            this.srcPath,
            request.context.issuer
          )
          this.importsByComponent[relativePath] =
            this.importsByComponent[relativePath] || []

          if (
            this.importsByComponent[relativePath].indexOf(
              relativeIssuerPath
            ) === -1
          ) {
            this.importsByComponent[relativePath].push(relativeIssuerPath)
            fs.writeFileSync(
              filePath,
              JSON.stringify(this.importsByComponent, null, 2)
            )
          }
        }

        return callback()
      }
    )
  }
}

exports.onPreBootstrap = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory)
  }
}

exports.onCreateWebpackConfig = ({ actions, getConfig, store }) => {
  const { program } = store.getState()

  actions.setWebpackConfig({
    resolve: {
      plugins: [
        new GatsbyComponentGraphPlugin({
          extensions: getConfig().resolve.extensions,
          projectRoot: program.directory
        })
      ]
    }
  })
}
