import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../../components/layout"
import styles from "../index.module.css"

export default ({ data }) => {
  let categories = data.allCategories.group
  return (
    <Layout>
      <div>
        <h2>Categories</h2>
        <div className={styles.blogList}>
          {
            categories.map(category => (
              <div>
                <h2 className={styles.categoryTitle}>{category.fieldValue}</h2>
                {category.edges.map( ({node}) => (
                  <div key={node.id}>
                    <h2 className={styles.blogPostTitle}> <Link to={node.fields.slug}>{node.frontmatter.title}</Link> </h2> 
                    <span className={styles.blogPostDate}> {node.frontmatter.date}</span>
                    <p>{node.excerpt}</p>
                  </div>
                ))}
                <hr/>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}


export const categoryListQuery = graphql`
query {
  allCategories: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/src/pages/blog//"
      }
      frontmatter:{
        render: {ne : false}
        published: {eq : true}
        type: {ne: "page"}
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
  ){
    group(
      field:frontmatter___categories
      limit: 5
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