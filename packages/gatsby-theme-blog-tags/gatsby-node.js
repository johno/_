const crypto = require('crypto')
const kebab = require('lodash.kebabcase')

const TagQuery = require.resolve('./src/templates/tag-query')
const TagsQuery = require.resolve('./src/templates/tags-query')

const DEFAULT_BASE_PATH = '/tags'

exports.createPages = async ({ graphql, actions }, options) => {
  const { basePath = DEFAULT_BASE_PATH } = options

  const result = await graphql(`
    {
      allBlogPost {
        nodes {
          tags
        }
      }
    }
  `)

  const allTags = result.data.allBlogPost.nodes.reduce((acc, post) => {
    return acc.concat(post.tags)
  }, [])
  const tags = [...new Set(allTags)]

  tags.forEach((tag) => {
    const path = `${basePath}/${kebab(tag)}`

    actions.createPage({
      path,
      component: TagQuery,
      context: {
        tag
      }
    })
  })

  actions.createPage({
    path: basePath,
    component: TagsQuery
  })
}

exports.sourceNodes = ({ actions }, options) => {
  actions.createTypes(`
    type BlogTagsOptions implements Node {
      basePath: String!
    }
  `)

  const optionData = {
    basePath: options.basePath || DEFAULT_BASE_PATH
  }

  actions.createNode({
    ...optionData,
    id: 'gatsby-theme-blog-tags-root',
    parent: null,
    children: [],
    internal: {
      type: 'BlogTagsOptions',
      content: JSON.stringify(optionData),
      description: 'Blog Tags Theme Options',
      contentDigest: crypto
        .createHash('md5')
        .update(JSON.stringify(optionData))
        .digest('hex')
    }
  })
}
