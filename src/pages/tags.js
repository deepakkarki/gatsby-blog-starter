import React from 'react'

import Layout from '../components/layout'
import TagIndex from '../components/tag/tag-index'
import tags from '../mock-data/tagData' //replaced with GraphQL query?

const TagsPage = () => (
  <Layout>
    <TagIndex tags={tags}/>
  </Layout>
)

export default TagsPage
