import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <h1>Hello World</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <blockquote>This is a quote. From a non famous person. So much for gyan!</blockquote>
    <code>
      <pre>
      for i in 1 to 10:
        print i
      </pre>
    </code>
    <Link to="/about">About page</Link>
    <br/>
    <Link to="/page-2/">Go to page 2</Link>
    <br/>
    <br/>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
