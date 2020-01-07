/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

export default () => (
  <Link
    to="/"
    sx={{
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': { color: 'tomato' }
    }}
  >
    ↟
  </Link>
)
