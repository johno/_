/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'

import PostListItem from './list-item'

export default ({ posts }) => (
  <Styled.ul
    sx={{
      variant: 'styles.postList'
    }}
  >
    {posts.map((post) => (
      <PostListItem key={post.slug} {...post} />
    ))}
  </Styled.ul>
)
