import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Prism from "@theme-ui/prism"
import { Helmet } from 'react-helmet'

import Layout from './layout'
import PostTitle from './title'

const CodeBlock = props => {
  const { children: codeString, ...restProps } = props
  return (
    <Prism {...restProps}>{codeString}</Prism>
  )
}

const components = {
  pre: props => props.children,
  code: CodeBlock
}

export default ({ data: { blogPost } }) => (
  <MDXProvider components={components}>
    <Layout>
      <Helmet title={blogPost.title} />
      <PostTitle>{blogPost.title}</PostTitle>
      <MDXRenderer>{blogPost.body}</MDXRenderer>
    </Layout>
  </MDXProvider>
)
