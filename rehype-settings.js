import rehypeReact from "rehype-react"
import React from "react"
import { Link } from "gatsby"
import Newsletter from "./src/components/newsletter/newsletter"
import MiniNewsletter from "./src/components/newsletter/mini-newsletter"
function MyButton(props){
    return <button>{props.children}</button>
}


export const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { 
      "my-button": MyButton,
      "i-link" : Link,
      "news-letter" : Newsletter,
      "mini-newsletter": MiniNewsletter,
    },
  }).Compiler