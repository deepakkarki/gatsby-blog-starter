import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from "../components/layout"

/*
NOTE: This is not used as of now, due to this stupid warning message.

warning The GraphQL query in the non-page component "/Users/deepakkarki/Desktop/portfolio/src/templates/mdx-post.js" will not be run.
Exported queries are only executed for Page components. Instead of an exported query, either co-locate a GraphQL fragment and compose that fragment into the query (or other fragment) of the top-level page that renders this component, or use a <StaticQuery> in this component. For more info on fragments and composition, see http://graphql.org/learn/queries/#fragments and for more information on <StaticQuery>, see https://gatsbyjs.org/docs/static-query

Apparently this warning should come in when a template is never used, 
and even though I did use it in gatsby-node.js, it doesn't seem to recognise, I guess mostly because
the stupid plugin auto processes anything under pages/, so if I move the mdx file to components, there is no problem

*/
export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>{data.mdx.frontmatter.title}</h1>
        <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`