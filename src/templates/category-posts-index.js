import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-posts-index.module.css"

export default ({ data, pageContext }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  const title = pageContext.category
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <div className={styles.blogList}>
          {
            nodes.map( (node) => (
              <div key={node.id}>
                <h2 className={styles.blogPostTitle}> <Link to={node.fields.slug}>{node.frontmatter.title}</Link> </h2> 
                <span className={styles.blogPostDate}> {node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            ))
          }
        </div>
        {/* Do the pagination links over here */}
      </div>
    </Layout>
  )
}

export const categoryListQuery = graphql`
  query categoryListQuery($skip: Int!, $limit: Int!, $blogPath: String!, $category: String!) {

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        fileAbsolutePath: {regex: $blogPath},
        frontmatter:{
          render: {ne : false},
          published: {eq : true},
          type: {ne: "page"},
          categories: {in: [$category]}
        }
      }
    ){
      edges {
        node {
          id
          fields{
              slug
          }
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