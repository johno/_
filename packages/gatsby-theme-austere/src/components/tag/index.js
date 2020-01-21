import React from 'react'
import {Helmet} from 'react-helmet'

import Layout from './layout'
import PostList from './list'

export default ({ data, pageContext }) => (
  <Layout title={pageContext.tag} titleTagName="h1">
    <Helmet title={'Posts on ' + pageContext.tag} />
    <PostList posts={data.allBlogPost.edges} />
  </Layout>
)
