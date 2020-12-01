import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";

export default ({
  children,
  title = "johno.com",
  description = "Writing about code and design",
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
      {title ? <h1>{title}</h1> : null}
      {children}
    </div>
  );
};
