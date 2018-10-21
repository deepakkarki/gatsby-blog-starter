import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>About Page</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>This is the about page!</p>
    <Link to="/">Go back home</Link>
  </Layout>
)

export default IndexPage
