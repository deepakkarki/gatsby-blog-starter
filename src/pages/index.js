import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import DayList from '../components/day-list/day-list'
import data from './links.js'

const IndexPage = () => (
  <Layout>
    <DayList date={data.date} links={data.links}/>
    <DayList date={data.date} links={data.links}/>
  </Layout>
)

export default IndexPage
