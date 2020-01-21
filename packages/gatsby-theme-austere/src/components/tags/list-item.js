/** @jsx jsx */
import {Link} from "gatsby"
import {Styled, jsx} from 'theme-ui'

import useBasePath from 'gatsby-theme-blog-tags/src/use-base-path'

export default ({ tag }) => {
  const basePath = useBasePath()

  return (
    <Styled.li
      sx={{
        variant: 'styles.tagListItem'
      }}
    >
      <Styled.a
        as={Link}
        to={basePath + '/' + tag}
        sx={{
          variant: 'styles.tagLink'
        }}
      >
        {tag}
      </Styled.a>
    </Styled.li>
  )
}
