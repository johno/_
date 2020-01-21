/** @jsx jsx */
import {Styled, jsx} from 'theme-ui'

import TagListItem from './list-item'

export default ({ tags }) => (
  <Styled.ul
    sx={{
      variant: 'styles.tagList'
    }}
  >
    {tags.map(tag => (
      <TagListItem
        key={tag.tag}
        {...tag}
      />
    ))}
  </Styled.ul>
)
