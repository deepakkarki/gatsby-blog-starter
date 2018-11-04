import React from 'react'
import styles from './day-list.module.css'

/**
 * This is the component for one days worth of links
 * in the discover dev feed.
 * 
 * date - date string ("2018-10-24")
 * links - contains the list of links for the day
 *      [{title:"", tags:["",""], url:"", description:"", domain:""}]
 */

const DayList = ({date, links}) => (
  <div className={styles.dayList}>
    <h1 className={styles.title}>{getDateRep(date)}</h1>
    <a className={styles.permalink} href={`/archive/${date}`}>[permalink]</a>
    <ul className={styles.links}>
      {links.map((link, i) =>(
        <li key={i} className={styles.linkItem}>

          <h3 className={styles.postLink}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
          </h3>
          <span className={styles.domain}> ({link.domain}) </span>

          <p className={styles.description}>{link.description || ""}</p>

          <p className={styles.tags}>
            {
              link.tags.map((tag, i) => (
                <a key={i} className={styles.tag} href={`/tags/${tag}`}>#{tag}</a>
              ))
            }
          </p>
        </li>
      ))}
    </ul>
  </div>
)

export default DayList

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