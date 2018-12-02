import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {renderAst} from "../../rehype-settings"
import styles from './blog-post.module.css'
import 'katex/dist/katex.min.css'


export default ({ data : {markdownRemark:mkd} }) => {
  const fm = mkd.frontmatter
  return (
    <Layout>
      <div>
        <h1 className={styles.header}>
          {fm.title}
        </h1>
        <p className={styles.author}>
          By {fm.author.name}, on {fm.date}
        </p>
        <div className={styles.content}>
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