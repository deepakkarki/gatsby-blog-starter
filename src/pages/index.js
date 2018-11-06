import React from 'react'

import Layout from '../components/layout'
import LinkList from '../components/link-list/link-list'
import data from '../mock-data/links'

import styles from './index.module.css'

const IndexPage = () => (
  <Layout>
    {/* following block in a loop - top 5 posts */}
    <div className={styles.dayList}>
      <h1 className={styles.title}>{getDateRep(data.date)}</h1>
      <a className={styles.permalink} href={`/archive/${data.date}`}>[permalink]</a>
      <LinkList links={data.links} />
    </div>

    <div className={styles.dayList}>
      <h1 className={styles.title}>{getDateRep(data.date)}</h1>
      <a className={styles.permalink} href={`/archive/${data.date}`}>[permalink]</a>
      <LinkList links={data.links} />
    </div>
  </Layout>
)

export default IndexPage

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