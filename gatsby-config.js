module.exports = {
  siteMetadata: {
    title: 'johno'
  },
  plugins: [
    {
      resolve: 'gatsby-theme-digital-garden',
      options: {
        notesPath: '/txt',
        mdxLayouts: {
          default: require.resolve(
            'gatsby-theme-digital-garden/src/components/layout'
          )
        },
        header: {
          home: {
            href: '/',
            label: 'johno'
          },
          links: [
            {
              href: '/writing',
              label: 'Writing'
            },
            {
              href: '/txt',
              label: 'Notes'
            },
            {
              href: '/contact',
              label: 'Contact'
            }
          ]
        }
      }
    },
    {
      resolve: 'gatsby-theme-digital-garden-blog',
      options: {
        postsPath: '/writing'
      }
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: 'FFYAPMRP'
      }
    }
  ]
}
