import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header/header.js'
import styles from './layout.module.css'


const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Portfolio' },
            { name: 'keywords', content: 'developer, web, frontend, javascript' },
          ]}
        >
          <html lang="en" />
        </Helmet>


        <Header siteTitle={data.site.siteMetadata.title} />
        <div className={styles.bodyWrapper}>
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
