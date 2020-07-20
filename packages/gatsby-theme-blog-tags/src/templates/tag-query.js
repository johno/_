import { graphql } from 'gatsby'

import TagPage from '../components/tag'

export default TagPage

export const query = graphql`
  query TagPageQuery($tag: String!) {
    allBlogPost(filter: { tags: { in: [$tag] } }) {
      edges {
        node {
          id
          excerpt
          body
          slug
          title
          tags
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
