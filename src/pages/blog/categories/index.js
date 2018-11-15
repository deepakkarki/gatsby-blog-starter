import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../../components/layout"
import styles from "../index.module.css"
import PostGrid from "../../../components/post-grid/post-grid"

export default ({ data }) => {
  let categories = data.allCategories.group
  return (
    <Layout>
      <div>
        <h1 className={styles.title}>Categories</h1>
        <div>
          {
            categories.map(category => (
              <div>
                <h2 className={styles.subTitle}>{category.fieldValue}</h2>
                <PostGrid posts={category.edges.map(edge => edge.node)}/>
                <h3 className={styles.seeMore}>
                  <Link to={`/blog/categories/${category.fieldValue}`}>See all posts in this category &rarr;</Link>
                </h3>
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
            desc
          }
          excerpt
        }
      }
    }
  }
}
`