import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/post-list/post-list"
import Pagination from "../components/pagination/pagination"

export default ({ data, pageContext:{limit, skip, totalPages, category}  }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  let currentPage = Math.floor(skip/limit) +1
  return (
    <Layout>
      <div>
        <h1>{category}</h1>
        <PostList posts={nodes} />
        <Pagination totalPages={totalPages} currentPage={currentPage} baseUrl="/blog/posts/categories"/>
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
            desc
          }
          excerpt
        }
      }
    }
  }
`