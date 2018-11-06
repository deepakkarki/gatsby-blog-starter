import React from 'react'
import styles from './archive-index.module.css'

/*
  As of now this dumps the whole history on a single page.
  Need to figure out a way to "paginate" it.
*/
const ArchiveIndex = ({archive}) => (
  <div className={styles.archive}>
    <div className={styles.titleWrap}><h1 className={styles.title}>ARCHIVE</h1></div>
    <ul className={styles.archiveList}>
      {archive.map((ai, i) =>(
        <li key={i} className={styles.archiveItem}>
            <a href={`/archive/${ai}`} target="_blank" rel="noopener noreferrer">
                {getDateRep(ai)}
            </a>
        </li>
      ))}
    </ul>
  </div> 
)

export default ArchiveIndex

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