import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import styles from "./nav.module.css"

const Nav = () => (
  <StaticQuery

    query={graphql`
      query NavBarQuery {
        site {
          siteMetadata {
            title
            navItems{
              name
              url
            }
          }
        }
      }
    `}

    // render props
    render={ props => {
      let meta = props.site.siteMetadata
      return(
      <nav className={styles.nav}>
        <h2 className={styles.siteTitle}>
          <Link to="/">
            {meta.title}
          </Link>
        </h2>
        <ul className={styles.navMenu}>
          {
            meta.navItems.map(item => (
              <li className={styles.navItem}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
      )
    }}
  />
)

export default Nav
