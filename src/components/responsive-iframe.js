/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ src, title = '', ...props }) => (
  <div
    {...props}
    css={{
      width: '100%',
      height: 0,
      paddingBottom: 900 / 16 + '%',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#eee',
      iframe: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        border: 0
      }
    }}
  >
    <iframe title={title} src={src} />
  </div>
)
