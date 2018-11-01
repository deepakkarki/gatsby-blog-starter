import React from 'react'
import Nav from './nav.js'
import styles from './header.module.css'

const Header = () => (
  <header className={styles.header}>
    <Nav/>
  </header>
)

export default Header
