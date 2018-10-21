import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import styles from "./index.module.css"

export default ({ data }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  return (
    <Layout>
      <div>
        <h1>My Blog posts</h1>
        <div className={styles.blogList}>
          {
            nodes.map( (node) => (
              <div key={node.id}>
                <h2 className={styles.blogPostTitle}> {node.frontmatter.title} </h2> 
                <span className={styles.blogPostDate}> {node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`