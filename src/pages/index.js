import React from 'react'

import Layout from '../components/layout'
import DayList from '../components/day-list/day-list'
import data from '../mock-data/links'

const IndexPage = () => (
  <Layout>
    <DayList date={data.date} links={data.links}/>
    <DayList date={data.date} links={data.links}/>
  </Layout>
)

export default IndexPage
