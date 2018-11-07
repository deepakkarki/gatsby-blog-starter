/*
 This is a single archive page,
 i.e. that of say 'archive/2018-06-06'

 I wonder if this should be in src/templates finally
 I guess that's how this will be used after all...
*/
import React from 'react'

import Layout from '../components/layout'
import LinkList from '../components/link-list/link-list'
import data from '../mock-data/tagLinks'
import styles from './tag-page.module.css'

const TagPage = () => (
  <Layout>
    <div className={styles.dayList}>
      <div className={styles.titleWrap}><h1 className={styles.title}>Tagged | block-chain </h1></div>
      <LinkList links={data}/>
    </div>
  </Layout>
)

export default TagPage
