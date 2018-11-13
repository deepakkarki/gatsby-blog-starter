import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/post-list/post-list"
import Pagination from "../components/pagination/pagination"

export default ({ data, pageContext:{limit, skip, totalPages} }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  const index = data.markdownRemark
  let currentPage = Math.floor(skip/limit) +1 //pages don't start from 0
  return (
    <Layout>
      <div>
        <h1>{index.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: index.html }} />
        <PostList posts={nodes} />
        <Pagination totalPages={totalPages} currentPage={currentPage} baseUrl="/blog/posts"/>
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