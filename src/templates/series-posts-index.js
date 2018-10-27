import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./blog-posts-index.module.css"

export default ({ data }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  const index = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{index.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: index.html }} />
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

export const seriesListQuery = graphql`
  query seriesListQuery($skip: Int!, $limit: Int!, $seriesPath: String!, $filePath: String!) {

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        fileAbsolutePath: {regex: $seriesPath},
        frontmatter:{
          render: {ne : false},
          published: {eq : true},
          type: {ne: "page"}
        }
      }
    ) {
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

    markdownRemark(
        fileAbsolutePath :{eq: $filePath}
      ){
        id
        html
        frontmatter {
          title
          layout
          postsPerPage
        }
        fields{
          slug
        }
      }
  }
`