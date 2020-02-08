export default {
  useCustomProperties: true,
  initialColorMode: 'system',
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#272727',
    secondary: '#119',
    muted: '#f6f6f6',
    highlight: '#efeffe',
    gray: '#777',
    accent: '#609'
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  sizes: {
    container: 864
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: [2, 3, 4]
    },
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6, 7],
      letterSpacing: '-0.04em',
      mt: 3
    }
  },
  forms: {
    input: {
      borderRadius: 0,
      borderColor: 'gray'
    }
  },
  styles: {
    header: {
      maxWidth: 'container',
      mb: [4, 5, 6]
    },
    postList: {
      listStyleType: 'none',
      m: 0,
      p: 0
    },
    tagList: {
      listStyleType: 'none',
      m: 0,
      p: 0
    },
    navLink: {
      color: 'text',
      textDecoration: 'none',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      fontSize: [2, 3, 4],
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      mb: [4, 5, 6]
    },
    h1: {
      variant: 'textStyles.display'
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 5
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 4
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 3
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1
    },
    a: {
      color: 'primary',
      textDecorationColor: '#c0bfc0',
      '&:hover': {
        color: 'text',
        textDecorationColor: '#000'
      }
    },
    pre: {
      fontFamily: 'monospace',
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      fontSize: [1, 2, 3],
      lineHeight: 1.2,
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace'
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted'
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px'
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px'
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted'
    },
    img: {
      maxWidth: '100%'
    }
  }
}
