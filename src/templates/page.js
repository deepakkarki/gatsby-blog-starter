import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {renderAst} from "../../rehype-settings"

export default ({ data : {markdownRemark:mkd} }) => {
  const fm = mkd.frontmatter
  return (
    <Layout>
      <div>
        <h1 style={{
            fontSize: "2.5em",
            paddingBottom: "10px",
            borderBottom: "2px solid black",
        }}>
          {fm.title}
        </h1>
        <div>
          { renderAst(mkd.htmlAst) }
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        author{
          name
        }
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`