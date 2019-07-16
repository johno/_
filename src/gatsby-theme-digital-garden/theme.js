import theme from 'gatsby-theme-digital-garden/src/theme'

const { styles, ...restTheme } = theme

const allStyles = {
  ...styles,
  Container: {
    maxWidth: '48em'
  },
  Header: {
    a: {
      color: 'black',
      textDecoration: 'none',
      fontWeight: 500,
      marginRight: 3
    }
  },
  blockquote: {
    fontSize: 4,
    fontWeight: 500,
    paddingLeft: 4,
    paddingTop: 3,
    paddingBottom: 3,
    borderLeft: '16px solid rebeccapurple'
  },
  p: {
    lineHeight: 1.6,
    fontSize: [2, 3, 3]
  },
  ul: {
    lineHeight: 1.6
  },
  li: {
    fontSize: 3
  },
  code: {
    fontSize: 3,
  },
  pre: {
    ...styles.pre,
    fontSize: 3,
    padding: 4
  }
}

export default {
  ...restTheme,
  styles: allStyles
}
