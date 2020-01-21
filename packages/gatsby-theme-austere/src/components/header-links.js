/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link, useStaticQuery, graphql} from 'gatsby'

export default ({ title }) => {
  const { site: { siteMetadata } } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <nav>
      <Link to='/'
        sx={{
          variant: 'styles.navLink',
          p: 2,
        }}
      >
        {title || siteMetadata.title}  
      </Link>
    </nav>
  )
}
