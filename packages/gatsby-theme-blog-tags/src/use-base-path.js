import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const result = useStaticQuery(
    graphql`
      {
        blogTagsOptions(id: { eq: "gatsby-theme-blog-tags-root" }) {
          basePath
        }
      }
    `
  )

  return result.blogTagsOptions.basePath
}
