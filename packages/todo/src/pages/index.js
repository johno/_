/** @jsx jsx */
import { jsx } from 'theme-ui'

import useCurrentUser from '../use-current-user'
import Layout from '../components/layout'
import Todos from '../components/todos'

export default () => {
  const { currentUser } = useCurrentUser()

  if (!currentUser) {
    return <Layout />
  }

  return (
    <Layout>
      <Todos />
    </Layout>
  )
}
