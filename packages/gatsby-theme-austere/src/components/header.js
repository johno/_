/** @jsx jsx */
import {jsx} from 'theme-ui'

import Logo from './logo'
import HeaderLinks from './header-links'

export default ({ title }) => {
  return (
    <header
      sx={{
        display: 'flex',
        alignItems: 'center',
        variant: 'styles.header',
        pt: [4, 5, 6],
        px: [3, 4, 5]
      }}
    >
      <Logo />
      <HeaderLinks title={title} />
    </header>
  )
}
