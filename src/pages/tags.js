import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import TagIndex from '../components/tag/tag-index'

const TagsPage = ({data}) => {
  let tags = data.allTagsJson.edges.map(edge => edge.node.tag)
  return (
    <Layout>
      <TagIndex tags={tags}/>
    </Layout>
  )
}

export default TagsPage

export const IndexQuery = graphql`
{
  allTagsJson(
    sort:{fields:articleCount, order:DESC}
  ){
    edges {
      node {
        tag
      }
    }
  }
}
`