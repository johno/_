/** @jsx jsx */
import {Styled, jsx} from 'theme-ui'

import Header from './header'

export default ({ children, title }) => (
  <Styled.root>
    <Header title={title} />
    <div
      sx={{
        maxWidth: 'container',
        px: [3, 4, 5]
      }}
    >
      {children}
    </div>
  </Styled.root>
)
