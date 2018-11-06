import React from 'react'
import styles from './tag-index.module.css'

const TagIndex = ({tags}) => (
  <div className={styles.tagList}>
    <div className={styles.titleWrap}><h1 className={styles.title}>Tags</h1></div>
    <ul className={styles.tags}>
      {tags.map((tag, i) =>(
        <li key={i} className={styles.tagItem}>
            <a href={`/tags/${tag}`} className={styles.tagLink} target="_blank" rel="noopener noreferrer">
                {tag}
            </a>
        </li>
      ))}
    </ul>
  </div> 
)

export default TagIndex