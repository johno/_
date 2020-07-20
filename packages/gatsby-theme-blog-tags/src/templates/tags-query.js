import { graphql } from 'gatsby'

import TagsPage from '../components/tags'

export default TagsPage

export const query = graphql`
  query TagsPageQuery {
    allBlogPost {
      group(field: tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
