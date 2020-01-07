/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Layout from 'gatsby-theme-austere/src/components/layout'
import Subscribe from './subscribe'

export default ({ skipSubscribe, ...props }) => (
  <div>
    <title>John Otander</title>
    <Layout {...props} />
    {skipSubscribe ? null : (
      <Styled.root>
        <Styled.hr />
        <div sx={{ maxWidth: 'container', mt: [4, 5, 6], mx: 'auto', px: 3 }}>
          <Subscribe>Sign up for my newsletter</Subscribe>
        </div>
      </Styled.root>
    )}
  </div>
)
