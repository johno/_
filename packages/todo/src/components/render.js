/** @jsx jsx */
import React from 'react'
import { transform } from '@babel/standalone'
import mdx from '@mdx-js/mdx'
import { ThemeProvider, Styled, jsx } from 'theme-ui'
import { mdx as createElement, MDXProvider } from '@mdx-js/react'
import babelPluginTransformReactJsx from '@babel/plugin-transform-react-jsx'
import babelPluginRemoveExportKeywords from 'babel-plugin-remove-export-keywords'

import babelPluginRemoveShortcodes from '../babel-plugins/remove-shortcodes'

import * as builtinComponents from './builtins'

const transformJsx = (jsx) => {
  const { code } = transform(jsx, {
    plugins: [
      babelPluginRemoveExportKeywords,
      babelPluginRemoveShortcodes,
      [babelPluginTransformReactJsx, { useBuiltIns: true }]
    ]
  })

  return code
}

const transformCodeForEval = (jsx) => {
  return `${jsx}
  return React.createElement(MDXProvider, { components },
    React.createElement(MDXContent, props)
  );`
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>We encountered an unknown error</h1>
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
          <builtinComponents.Button
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try rerendering
          </builtinComponents.Button>
        </div>
      )
    }

    //return null

    return this.props.children
  }
}

const Renderer = ({
  children: mdxSrc,
  scope = {},
  components = {},
  theme = {},
  ...props
}) => {
  const fullScope = {
    ...builtinComponents,
    mdx: createElement,
    MDXProvider,
    React,
    components: { ...Styled, ...components },
    props,
    theme,
    ...scope
  }
  const scopeKeys = Object.keys(fullScope)
  const scopeValues = Object.values(fullScope)

  const jsxFromMdx = mdx.sync(mdxSrc, { skipExport: true })
  const srcCode = transformJsx(jsxFromMdx)

  const fn = new Function(...scopeKeys, transformCodeForEval(srcCode))
  const el = fn(...scopeValues)

  return (
    <ThemeProvider theme={theme}>
      <main
        sx={{
          bg: 'background',
          fontFamily: 'body',
          color: 'text',
          px: [2, 3, 4],
          py: [3, 4, 5]
        }}
      >
        {el}
      </main>
    </ThemeProvider>
  )
}

export default (props) => (
  <ErrorBoundary>
    <Renderer {...props} />
  </ErrorBoundary>
)
