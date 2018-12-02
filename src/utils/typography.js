import Typography from "typography"
import parnassusTheme from "typography-theme-parnassus"

/* 
 Weirdly I can't put this in overrideThemeStyles! Well duh.
 The theme is basically a JS object viz the configuration. See the following link on how to use
 https://github.com/KyleAMathews/typography.js/blob/master/packages/typography-theme-parnassus/src/index.js

 `overrideThemeStyles()` just overrides the styling applied to specific elements. 
 Basically selector followed by rules. So most while I can't
 { baseFontSize : '17px'} , I can mostly do
 { html : { fontSize : '17px'} }.
*/


parnassusTheme.baseFontSize = '17px'
parnassusTheme.scaleRatio = 2.75
parnassusTheme.googleFonts = [
    {
      name: 'Inconsolata',
      styles: ['400', '700'],
    }
  ]
parnassusTheme.headerFontFamily = ['Inconsolata', 'monospace']
parnassusTheme.bodyFontFamily = ['Inconsolata', 'monospace']
parnassusTheme.baseLineHeight = 1.55
parnassusTheme.headerColor = 'hsla(0,0%,0%,0.9)',
parnassusTheme.bodyColor = 'hsla(0,0%,0%,0.85)',


parnassusTheme.overrideThemeStyles = ({adjustFontSizeTo, rhythm}, options, styles) => {

  return { 
    body: {
      minHeight: "100vh",
      position: "relative",
    },
    blockquote: {
        ...adjustFontSizeTo('16px'),
        fontStyle: 'italic',
        borderColor: 'none',
        borderLeft: `${rhythm(3/16)} solid darkblue`,
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        background: "#f5f5ff",
        paddingRight: ".75em",
    },
    'blockquote > :last-child': {
        marginBottom: 0,
    },
    
    a: {
        boxShadow: 'none',
        color: 'blue',
        backgroundColor: 'inherit',
    },
  }
}


const typography = new Typography(parnassusTheme)

export default typography
