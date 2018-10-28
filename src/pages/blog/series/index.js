/*
maybe make this an index.md
Add the necessary stuff in the frontmatter
  like which series would you like to feature and stuff.
and then have a function in gatsby-node.js which will read the markdown and
do the query. Result is then passed to the template as pageContext
*/

// or never mind, just call it out manually(?)
//  but for this I have to change the jsx & graphql every time I add a series.

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../../components/layout"
import styles from "../index.module.css"

export default ({ data }) => {
  let seriesNameMap = {
    "js30" : "JS 30",
    "jsFoo" : "JS FOO"
  }
  console.log(data)
  return (
    <Layout>
      <div>
        <h2>Categories</h2>
        {
          Object.entries(seriesNameMap).map(([series, name])=>{
            console.log(series, name)
            let nodes = data[series].edges.map( edge => edge.node )
            console.log(nodes)
            return (
            <div>
              <h2>{name}</h2>
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
              <h3><Link to={`/blog/series/${series}`}>See all posts in the series</Link></h3>
            </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

// this will remain more or less constant.
export const seriesIndexFragment = graphql`
  fragment seriesIndex on MarkdownRemarkConnection {
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
`

// this is specific to each series mainly because
//  of "name aliasing" and "fileAbsolutePath"
// just change that from query to query
export const js30Fragment = graphql`
  fragment js30 on Query {
    js30: allMarkdownRemark(
      filter: {
        fileAbsolutePath: {regex: "/src/pages/blog/series/js30//"}
        frontmatter:{render: {ne : false}, published: {eq : true}, type: {ne: "page"}}
      }
      sort: { fields: [frontmatter___date], order: DESC }, limit: 3
      ){
        ...seriesIndex
      }
  }
`

export const jsFooFragment = graphql`
  fragment jsFoo on Query {
    jsFoo: allMarkdownRemark(
      filter: {
        fileAbsolutePath: {regex: "/src/pages/blog/series/jsFoo//"}
        frontmatter:{render: {ne : false}, published: {eq : true}, type: {ne: "page"}}
      }
      sort: { fields: [frontmatter___date], order: DESC }, limit: 3
      ){
        ...seriesIndex
      }
  }
`

export const categoryListQuery = graphql`
query {
  ...js30
  ...jsFoo
}
`