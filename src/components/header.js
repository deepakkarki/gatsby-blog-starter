import React from 'react'
import { Link } from 'gatsby'
import styles from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <h2>
      <Link to="/">
        {siteTitle}
      </Link>
    </h2>
    <nav className={styles.nav}>
      <Link to="/about">
        <b>About</b>
      </Link>
      <Link to="/blog">
        <b>Blog</b>
      </Link>
    </nav>
  </header>
)

export default Header
