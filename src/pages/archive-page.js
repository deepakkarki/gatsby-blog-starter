/*
 This is a single archive page,
 i.e. that of say 'archive/2018-06-06'

 I wonder if this should be in src/templates finally
 I guess that's how this will be used after all...
*/
import React from 'react'

import Layout from '../components/layout'
import LinkList from '../components/link-list/link-list'
import data from '../mock-data/links'
import styles from './archive-page.module.css'

const ArchivePage = () => (
  <Layout>
    <div className={styles.dayList}>
      <div className={styles.titleWrap}><h1 className={styles.title}>Archive | {getDateRep(data.date)}</h1></div>
      <LinkList links={data.links}/>
    </div>
  </Layout>
)

export default ArchivePage


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