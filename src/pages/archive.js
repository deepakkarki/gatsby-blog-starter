import React from 'react'

import Layout from '../components/layout'
import ArchiveIndex from '../components/archive/archive-index'
import archive from '../mock-data/archiveData' //replaced with GraphQL query?

const ArchivePage = () => (
  <Layout>
    <ArchiveIndex archive={archive}/>
  </Layout>
)

export default ArchivePage
