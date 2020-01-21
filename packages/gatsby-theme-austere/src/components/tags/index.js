import React from 'react'
import {Helmet} from 'react-helmet'

import Layout from './layout'
import TagList from './list'

export default ({ data }) => (
  <Layout title="Tags" titleTagName="h1">
    <Helmet title="Tags" />
    <TagList tags={data.allBlogPost.group} />
  </Layout>
)
