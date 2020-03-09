import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Helmet } from 'react-helmet'

import Layout from './layout'
import PostTitle from './title'
import CodeBlock from '../code-block'

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock
}

export default ({ data: { blogPost } }) => (
  <Layout>
    <Helmet title={blogPost.title} />
    <PostTitle>{blogPost.title}</PostTitle>
    <MDXRenderer components={components}>{blogPost.body}</MDXRenderer>
  </Layout>
)
