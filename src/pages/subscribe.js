import React from 'react'

import Layout from '../components/layout'
import Newsletter from '../components/newsletter/newsletter.js'
import styles from './subscribe.module.css'

const IndexPage = () => (
  <Layout sidebar={false}>
    <h1 className={styles.title}>SUBSCRIBE</h1>

    <p className={styles.desc}>At DiscoverDev we curate high quality software engineering articles from all over the web. We also run a blog where developers publish original content. To keep up, subscribe to our mailing list! We don't spam or share your email with anyone, just the weekly email with great links.</p>
    <div className={styles.newsletter}>
      <Newsletter/>
    </div>
  </Layout>
)

export default IndexPage
