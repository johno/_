const isShortcode = (declaration) =>
  declaration.init.callee && declaration.init.callee.name === `makeShortcode`
const isShortcodeFunction = (declaration) =>
  declaration.id.name === `makeShortcode`

const shouldRemoveDeclaration = (declaration) =>
  isShortcode(declaration) || isShortcodeFunction(declaration)

module.exports = (api) => {
  return {
    visitor: {
      // Remove unneeded variables that MDX outputs but we won't use
      VariableDeclaration(path) {
        const declaration = path.node.declarations[0]
        if (!declaration) {
          return
        }

        if (shouldRemoveDeclaration(declaration)) {
          path.remove()
        }
      }
    }
  }
}
