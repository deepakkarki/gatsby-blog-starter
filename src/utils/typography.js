import Typography from "typography"
import parnassusTheme from "typography-theme-parnassus"

// weirdly I can't put this in overrideThemeStyles
parnassusTheme.baseFontSize = '17px'
parnassusTheme.scaleRatio = 2.25,


parnassusTheme.overrideThemeStyles = ({adjustFontSizeTo, rhythm}, options, styles) => {

  return { 
    body: {
      minHeight: "100vh",
      position: "relative",
    },
    blockquote: {
        ...adjustFontSizeTo('17px'),
        fontStyle: 'italic',
        borderColor: 'none',
        borderLeft: `${rhythm(3/16)} solid blue`,
    },
    'blockquote > :last-child': {
        marginBottom: 0,
    },
    
    a: {
        boxShadow: 'none',
        color: 'inherit',
        backgroundColor: 'inherit',
    }
  }
}


const typography = new Typography(parnassusTheme)

export default typography
