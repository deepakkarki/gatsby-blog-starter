import React from 'react'

import Layout from '../components/layout'
import LinkList from '../components/link-list/link-list'

import styles from './index.module.css'
import { graphql } from 'gatsby';

const IndexPage = ({data}) => {
  let nodes = data.allLinksJson.edges.map(edge => edge.node)
  return(
    <Layout>
      {
        nodes.map( (node,i) => (
          <div key={i} className={styles.dayList}>
            <h1 className={styles.title}>{getDateRep(node.date)}</h1>
            <a className={styles.permalink} href={`/archive/${node.date}`}>[permalink]</a>
            <LinkList links={node.links} />
          </div>
          )
        )
      }
    </Layout>
  )
}

export default IndexPage

export const IndexQuery = graphql`
{
  allLinksJson(
    sort:{fields:date, order: DESC}
    limit:5
  ) {
    edges {
      node {
        date
        links{
          title
          domain
          tags
          url
        }
      }
    }
  }
}

`

/**
 * dateStr is string of the form '2018-10-22'
 */
function getDateRep(dateStr){
  let d = new Date(dateStr)
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let months = [ "January", "February", "March", "April", 
                "May", "June", "July", "August", "September", 
                "October", "November", "December" ]
  let dayOfWeek = days[d.getDay()]
  let dayOfMonth = d.getDate()
  let month = months[d.getMonth()]
  dayOfMonth = dayOfMonth < 10? `0${dayOfMonth}`:`${dayOfMonth}`

  return `${dayOfWeek}, ${dayOfMonth} ${month}`.toUpperCase()
}