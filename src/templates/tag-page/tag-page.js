/*
 This is a single archive page,
 i.e. that of say 'archive/2018-06-06'

 I wonder if this should be in src/templates finally
 I guess that's how this will be used after all...
*/
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import LinkList from '../../components/link-list/link-list'
import styles from './tag-page.module.css'

const TagPage = ({data}) => {
  let {tag, links} = data.tagsJson
  return (
    <Layout>
      <div className={styles.dayList}>
        <div className={styles.titleWrap}><h1 className={styles.title}>Tagged | {tag} </h1></div>
        <LinkList links={links}/>
      </div>
    </Layout>
  )
}

export default TagPage


export const TagPageQuery = graphql`
  query TagPageQuery($id: String!){
    tagsJson(
      id: { eq : $id }
    ){
      tag
      links{
        url
        tags
        title
        domain
      }
    }
  }
`