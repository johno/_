# gatsby-theme-blog-tags

Add tag pages to your Gatsby theme-based blog.

## Installation

With npm:

```sh
npm install --save gatsby-theme-blog-tags
```

With yarn:

```sh
yarn add gatsby-theme-blog-tags
```

## Usage

The tags theme **depends upon `gatsby-theme-blog-core`**, so make sure
you also have it installed and configured:

```js
module.exports = {
  siteMetadata: {
    title: 'Hello, world!'
  },
  plugins: ['gatsby-theme-blog-core', 'gatsby-theme-blog-tags']
}
```

### Options

| Name       | Default | Description             |
| ---------- | ------- | ----------------------- |
| `basePath` | `/tags` | Base path for tag pages |

### Shadow the tag components

By default, the tags theme only sets up the data and programmatically creates
pages. They render the data in a `pre` tag so you can see the data that's
passed to the page. If you're using the theme directly you will need to shadow
the files so you can customize their rendering.

```sh
mkdir -p src/gatsby-theme-blog-tags/components

cp node_modules/gatsby-theme-blog-tags/src/components/tag.js \
   src/gatsby-theme-blog-tags/components/tag.js

cp node_modules/gatsby-theme-blog-tags/src/components/tags.js \
   src/gatsby-theme-blog-tags/components/tags.js
```

### Latent shadowing

If you're building a theme that optionally supports tags you
can use [latent shadowing](https://johno.com/latent-component-shadowing)
to activate the pages when `gatsby-theme-blog-tags` is added
as a sibling theme. To do so, follow the shadow instructions
above.

## License

MIT
