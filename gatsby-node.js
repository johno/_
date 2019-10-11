const replacePath = path =>
  path === '/writing/archives' ? path : path.replace(/^\/writing\/archives/, '')

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  const oldPage = { ...page }
  page.path = replacePath(page.path)

  if (page.path !== oldPage.path) {
    deletePage(oldPage)
    createPage(page)
  }
}
