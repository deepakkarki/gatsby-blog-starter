import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import styles from "./index.module.css"

export default ({ data }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  console.log(nodes)
  return (
    <Layout>
      <div>
        <h1>My Blog posts</h1>
        <Link to="/blog/posts">See all posts</Link> <br/><br/>
        <Link to="/blog/series">See all series</Link> <br/><br/>
        <Link to="/blog/categories">See all categories</Link><br/><br/>

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
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (
      filter: {
        fileAbsolutePath: {regex: "pages/blog//"}
        frontmatter:{
          render: {ne : false}
          published: {eq : true}
          type: {ne: "page"}
        }
      }
    ){
      totalCount
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