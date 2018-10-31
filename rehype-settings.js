import rehypeReact from "rehype-react"
import React from "react"
import { Link } from "gatsby"

function MyButton(props){
    return <button>{props.children}</button>
}


export const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { 
      "my-button": MyButton,
      "i-link" : Link
    },
  }).Compiler