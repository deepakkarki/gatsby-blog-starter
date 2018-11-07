import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ArchiveIndex from '../components/archive/archive-index'

const ArchivePage = ({data}) => {
  let dates = data.allLinksJson.edges.map(edge => edge.node.date)
  return (
    <Layout>
      <ArchiveIndex archive={dates}/>
    </Layout>
  )
}

export default ArchivePage

export const ArchiveQuery = graphql`
{
  allLinksJson(
    sort:{fields:date, order: DESC}
  ) {
    edges {
      node {
        date
      }
    }
  }
}
`