/** @jsx jsx */
import { Global } from '@emotion/core'
import { Link } from 'gatsby'
import { Styled, Container, jsx } from 'theme-ui'
import { Helmet } from 'react-helmet'

import useCurrentUser from '../use-current-user'
import { navigate } from '@reach/router'

export default ({ children }) => {
  const { currentUser, login, logout } = useCurrentUser()

  return (
    <Styled.root>
      <Helmet>
        <html lang="en" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
        />
        <title>two(2)duo</title>
        <meta property="description" content="An MDX platform" />
        <link
          rel="shortcut icon"
          href="https://user-images.githubusercontent.com/1424573/70815603-07fe7e00-1d8b-11ea-85f1-a502d881c954.png"
        />
        <meta property="og:url" content="https://twoduo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="twoduo" />
      </Helmet>
      <Global
        styles={{
          body: {
            margin: 0
          },
          '*': {
            boxSizing: 'border-box'
          }
        }}
      />
      <header>
        <Container sx={{ display: 'flex', alignItems: 'center', p: [2, 3, 4] }}>
          <Link
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <span
              role="img"
              aria-label="Anchor logo"
              sx={{ fontWeight: 'bold' }}
            >
              two(2)duo
            </span>
          </Link>
          <div sx={{ ml: 'auto' }} />
          {currentUser ? (
            <nav>
              <a
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 'bold'
                }}
                onClick={async () => {
                  await logout()
                  navigate('/')
                }}
              >
                Log Out
              </a>
            </nav>
          ) : (
            <a
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold'
              }}
              onClick={async () => {
                await login()
                navigate('/')
              }}
            >
              Log In
            </a>
          )}
        </Container>
      </header>
      <Container
        sx={{
          py: 3,
          px: [2, 3, 4]
        }}
      >
        {children}
      </Container>
    </Styled.root>
  )
}
