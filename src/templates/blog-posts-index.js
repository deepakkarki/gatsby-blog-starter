import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PostGrid from "../components/post-grid/post-grid"

export default ({ data }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  const index = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{index.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: index.html }} />
        <PostGrid posts={nodes}/>
        {/* Do the pagination links over here */}
      </div>
    </Layout>
  )
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $blogPath: String!, $filePath: String!) {

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        fileAbsolutePath: {regex: $blogPath},
        frontmatter:{
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
            desc
            categories
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