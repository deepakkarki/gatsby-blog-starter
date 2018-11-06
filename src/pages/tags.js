import React from 'react'

import Layout from '../components/layout'
import TagIndex from '../components/tag-index/tag-index'
import tags from './tagData' //replaced with GraphQL query?

const TagsPage = () => (
  <Layout>
    <TagIndex tags={tags}/>
  </Layout>
)

export default TagsPage
