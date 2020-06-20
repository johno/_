/** @jsx jsx */
import { jsx } from 'theme-ui'

import useCurrentUser from '../use-current-user'
import Layout from '../components/layout'
import Todos from '../components/todos'

import Welcome from '../content/welcome.mdx'

export default () => {
  const { currentUser } = useCurrentUser()

  if (!currentUser) {
    return (
      <Layout>
        <Welcome />
      </Layout>
    )
  }

  return (
    <Layout>
      <Todos />
    </Layout>
  )
}
