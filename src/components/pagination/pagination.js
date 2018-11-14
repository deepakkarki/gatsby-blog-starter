import React from 'react'
import styles from './pagination.module.css'
import { Link } from 'gatsby'

const Pagination = ({totalPages, currentPage, baseUrl}) => {
  let indexP = currentPage - 1 //currentPage is always >= 1
  let indexN = currentPage + 1

  // index of prev page should be > 1 for url to have page num
  let prev = `${baseUrl}/${indexP > 1? indexP:''}`

  // if there is only 1 page, wouldn't want `next` to be bseUrl/1
  let cp = currentPage==1 ? '':currentPage
  let next = `${baseUrl}/${indexN > totalPages? cp:indexN}`


  return (
    <ul className={styles.pagination}>
      <li className={styles.page}>
        <Link className={styles.link} to={prev}>«</Link>
      </li>

      {
        Array.from({length:totalPages}).map((_, x) => {
          let i = x+1
          let cn = `${styles.page}`
          if(i === currentPage){
            cn = `${styles.page} ${styles.highlight}`
          }
          return (
            <li className={cn} key={i}>
                <Link className={styles.link} to={`${baseUrl}/${i===1?'':i}`}>{i}</Link>
            </li>
          )
        })
      }

      <li className={styles.page}>
        <Link className={styles.link} to={next}>»</Link>
      </li>
    </ul>
  )
}
export default Pagination

