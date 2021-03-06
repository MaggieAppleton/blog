import prism from '@theme-ui/prism/presets/theme-ui'
import { darken, lighten } from 'polished'
import { bpMaxMD, minSM, minMD, minLG, minXL, minXXL } from '../lib/breakpoints'

export default {
  useCustomProperties: true,
  sizes: {
    container: 864,
    minSM,
    minMD,
    minLG,
    minXL,
    minXXL,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Source Serif Pro", serif',
    heading: 'Open Sans, "Avenir Next", Helvetica, Arial, sans-serif',
    monospace: 'Lato, sans-serif',
  },
  fontSizes: [9.22, 11.52, 14.4, 18.0, 22.5, 28.13, 35.16, 43.95, 54.93],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.7,
    heading: 1.14,
  },
  colors: {
    text: '#233044',
    white: '#fff',
    background: '#fff',
    primary: '#7B14D1',
    secondary: '#C320D6',
    muted: '#f5f2ed',
    darkMuted: darken(0.3, '#f5f2ed'),
    gray: '#777C9B',
    orange: '#FFB65C',
    darkGray: darken(0.05, '#777C9B'),
    lightGray: lighten(0.2, '#777C9B'),
    lightestGrey: lighten(0.35, '#777C9B'),
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    display: {
      variant: 'textStyles.heading',
      fontSize: [5, 6, 7],
      letterSpacing: '-0.04em',
      mt: 3,
    },
  },
  styles: {
    header: {
      maxWidth: 'container',
      mb: [4, 5, 6],
    },
    postlist: {
      listStyleType: 'none',
      m: 0,
      p: 0,
    },
    postlink: {
      textDecoration: 'none',
      color: 'text',
    },
    postlistitem: {
      padding: '.5rem',
      margin: '0 -0.5rem',
      borderRadius: 5,
      ':hover': {
        backgroundColor: 'muted',
      },
    },
    filterSection: {
      display: 'grid',
      gridTemplateColumns: '70% 27%',
      fontSize: '0.85em',
      fontFamily: 'heading',
    },
    growthFilter: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      alignContent: 'flex-start',
    },
    topicFilter: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    notesGrid: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '2em',
    },
    navlink: {
      color: 'darkGray',
      textDecoration: 'none',
      fontWeight: 'heading',
      fontFamily: 'heading',
      letterSpacing: '0.5px',
      '&:hover': {
        color: 'primary',
        textDecorationColor: '#000',
      },
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      fontSize: [3, 3, 4],
      padding: [10, 10, 10, 0],
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      maxWidth: 'container',
      margin: 'auto',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 8,
    },
    h2: {
      color: 'text',
      fontFamily: 'body',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 7,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 6,
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 4,
    },
    a: {
      color: 'primary',
      fontFamily: 'body',
      textDecorationColor: '#c0bfc0',
      '&:hover': {
        color: 'text',
        textDecorationColor: '#000',
      },
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 3,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      ...prism,
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
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
        borderBottomStyle: 'solid',
      },
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px',
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px',
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted',
    },
    span: {
      wordWrap: 'break-word',
      whiteSpace: 'pre-line',
      overflowWrap: 'break-word',
    },
    blockquote: {
      fontSize: '3',
      p: {
        marginRight: '40px',
        marginRight: 0,
      },
      footer: {
        fontSize: '2',
        textAlign: 'right',
      },
      bpMaxMD: {
        marginLeft: '1.5em',
        marginRight: '0em',
        p: {
          width: '100%',
        },
        footer: {
          width: '100%',
        },
      },
    },
  },
  images: {
    tiny: {
      width: 25,
      height: 25,
      borderRadius: 99999,
    },
  },
}
