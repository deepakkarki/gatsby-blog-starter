import React from 'react'
import styles from './link-list.module.css'

/**
 * This is the component for one days worth of links
 * in the discover dev feed. This is just the list of links
 * 
 * links - contains the list of links for the day
 *      [{title:"", tags:["",""], url:"", description:"", domain:""}]
 */

const LinkList = ({links}) => (
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
)

export default LinkList

