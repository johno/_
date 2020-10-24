import { h, Fragment } from 'preact'
import { Helmet } from 'react-helmet'

export default ({ children, title, ...props }) => {
  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
      {title ? <h1>{title}</h1> : null}
      {children}
    </div>
  )
}
