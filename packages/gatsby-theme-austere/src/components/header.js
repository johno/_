/** @jsx jsx */
import {jsx, useColorMode} from 'theme-ui'

import Logo from './logo'
import HeaderLinks from './header-links'
import useOptions from "../use-options"

export default ({ title }) => {
  const { withDarkMode } = useOptions()
  const [ mode, setMode ] = useColorMode()
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
      {withDarkMode && <button
        sx={{
          marginLeft: 'auto',
          height: '20px',
          width: '20px',
          border: '2px solid #c0bfc0',
          borderRadius: '50%',
          background: 'transparent',
          cursor: 'pointer'
        }}
        onClick={e => {
          const next = mode === 'dark' ? 'light' : 'dark'
          setMode(next)
        }}
      />}
    </header>
  )
}
