import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import styles from "./nav.module.css"
import logo from "../../images/dd-logo-and-text.svg"

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
        <Link className={styles.homeLink} to="/">
          <img className={styles.siteLogo} src={logo} alt="DiscoverDev logo"></img>
        </Link>
        <ul className={styles.navMenu}>
          {
            meta.navItems.map((item, i) => (
              <li key={i} className={styles.navItem}>
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
