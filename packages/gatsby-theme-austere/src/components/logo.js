/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link} from 'gatsby'

export default () => (
  <Link
    to='/'
    sx={{
      height: 48
    }}
  >
    <img
      src="https://contrast.now.sh/white/black?text=Aa&fontSize=2&radius=8&size=48&baseline=1"
      alt="Austere Gatsby theme logo"
    />
  </Link>
)
