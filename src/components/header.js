import React from 'react'
import { Link } from 'gatsby'
import headerStyles from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header className={headerStyles.header}>
    <h1>
      <Link to="/">
        {siteTitle}
      </Link>
    </h1>
    <nav className={headerStyles.nav}>
      <Link to="/">
        Home
      </Link>
      <Link to="/about">
        About
      </Link>
    </nav>
  </header>
)

export default Header
