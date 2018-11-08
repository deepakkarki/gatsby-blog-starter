import React from 'react'
import { Link } from 'gatsby'

import styles from './tag-index.module.css'

const TagIndex = ({tags}) => (
  <div className={styles.tagList}>
    <div className={styles.titleWrap}><h1 className={styles.title}>TAGS</h1></div>
    <ul className={styles.tags}>
      {tags.map((tag, i) =>(
        <li key={i} className={styles.tagItem}>
            <Link to={`/tags/${tag}`} className={styles.tagLink} rel="noopener noreferrer">
                {tag}
            </Link>
        </li>
      ))}
    </ul>
  </div> 
)

export default TagIndex