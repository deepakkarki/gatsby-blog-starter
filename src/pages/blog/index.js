import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import styles from "./index.module.css"

export default ({ data }) => {
  let postNodes = data.allPosts.edges.map( edge => edge.node )
  let js30Nodes = data.js30.edges.map( edge => edge.node )
  let categories = data.allCategories.group

  return (
    <Layout>
      <div>
        <h1>My Blog posts</h1>
        <Link to="/blog/posts">See all posts</Link> <br/><br/>
        <Link to="/blog/series">See all series</Link> <br/><br/>
        <Link to="/blog/categories">See all categories</Link><br/><br/>

        <h2>Latest Posts</h2>
        <div className={styles.blogList}>
          {
            postNodes.map( (node) => (
              <div key={node.id}>
                <h2 className={styles.blogPostTitle}> <Link to={node.fields.slug}>{node.frontmatter.title}</Link> </h2> 
                <span className={styles.blogPostDate}> {node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            ))
          }
        </div>
        <h3><Link to="/blog/posts">See all posts in the blog</Link></h3>

        <h2>JS30 Series</h2>
        <div className={styles.blogList}>
          {
            js30Nodes.map( (node) => (
              <div key={node.id}>
                <h2 className={styles.blogPostTitle}> <Link to={node.fields.slug}>{node.frontmatter.title}</Link> </h2> 
                <span className={styles.blogPostDate}> {node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            ))
          }
        </div>
        <h3><Link to="/blog/series/js30">See all posts in the series</Link></h3>

        <h2>Categories</h2>
        <div className={styles.blogList}>
          {
            categories.map(category => (
              <div>
                <h3>{category.fieldValue}</h3>
                {category.edges.map( ({node}) => (
                  <div key={node.id}>
                    <h2 className={styles.blogPostTitle}> <Link to={node.fields.slug}>{node.frontmatter.title}</Link> </h2> 
                    <span className={styles.blogPostDate}> {node.frontmatter.date}</span>
                    <p>{node.excerpt}</p>
                  </div>
                ))}
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
    allPosts: allMarkdownRemark (
      filter: {
        fileAbsolutePath: {
          regex: "/src/pages/blog//"
        }
        frontmatter:{
          published: {eq : true}
          type: {ne: "page"}
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
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
  
  js30: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/src/pages/blog/series/js30//"
      }
      frontmatter:{
        published: {eq : true}
        type: {ne: "page"}
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
    limit: 3
  ){
    edges{
      node{
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
  
  allCategories: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/src/pages/blog//"
      }
      frontmatter:{
        published: {eq : true}
        type: {ne: "page"}
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
  ){
    group(
      field:frontmatter___categories
      limit: 2
    ){
        totalCount
  	    fieldValue
      	edges{
          node{
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
  }
`