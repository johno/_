import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import { MDXProvider } from '@mdx-js/preact'

import { Iframe } from './components/iframe.js'

export default ({
  children,
  title = "johno.com",
  description = "Writing about code and design",
  showTitle,
  ...props
}) => {
  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="/styles.css" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      {showTitle ? <h1>{title}</h1> : null}
      <MDXProvider components={{ Iframe }}>
        {children}
      </MDXProvider>
    </div>
  );
};
