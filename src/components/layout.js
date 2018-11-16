import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header/header.js'
import Newsletter from './newsletter/newsletter.js'
import styles from './layout.module.css'


const Layout = ({ children, sidebar=true, wide=false }) => (
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
          <meta property="og:title" content="DiscoverDev | Daily digest of engineering blog posts for software developers" />
          <meta property="og:image" content="https://i.lensdump.com/i/uYTND.png" />

          {/* Following 3 meta properties may have to be overwritten by specific templates */}
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://discoverdev.io"/>
          <meta property="og:description" content="Checkout awesome engineering blog posts from across the internet, covering systems, data science, hardware, web and more! Curated and delivered every weekday!"/>
          <html lang="en" />
        </Helmet>


        <Header siteTitle={data.site.siteMetadata.title} />
        <div className={styles.bodyWrapper}>
          <div className={styles.contentWrapper} style={wide?{maxWidth:"unset"}:null}>
            {children}
          </div>
          {sidebar? <Newsletter/>: null}
        </div>
        <footer className={styles.footer}>
          <p className={styles.footerMsg}>Made with ♥ by a group of nerds on Earth!</p>
          <p className={styles.copyright}>© Copyright 2018 Discoverdev.io</p>
        </footer>
        <div className={styles.ghostFooter}></div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
