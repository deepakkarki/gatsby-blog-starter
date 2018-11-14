import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/post-list/post-list"
import Pagination from "../components/pagination/pagination"

export default ({ data, pageContext:{limit, skip, totalPages, seriesName}  }) => {
  let nodes = data.allMarkdownRemark.edges.map( edge => edge.node )
  let currentPage = Math.floor(skip/limit) +1
  const index = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{index.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: index.html }} />
        <PostList posts={nodes} />
        <Pagination totalPages={totalPages} currentPage={currentPage} baseUrl={`/blog/series/${seriesName}`}/>
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