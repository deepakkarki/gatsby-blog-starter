import React from 'react'
import styles from './mini-newsletter.module.css'

// This is a more minimalistic subscribe box, to squish into places where you
// can't shove the fully sized one.

const MiniNewsletter = ({className}) => (
  <div className={`${styles.signupBox} ${className}`}>
    <h2 className={styles.title}>
      Subscribe
    </h2>
    <p className={styles.message}>
    Join 5000+ fellow software engineers who receive our curated weekly digest! <br/>
    </p>
    <form className={styles.form} action="https://discoverdev.us16.list-manage.com/subscribe/post" method="POST">
      <input type="hidden" name="u" value="c32352dc58bef5cdd7821a012"/>
      <input type="hidden" name="id" value="6aab40a607"/>
      <input type="email" autoCapitalize="off" autoCorrect="off" name="MERGE0" id="MERGE0" 
              className={styles.email} size="25" placeholder="Email"/>
      <input type="submit" className={styles.submit} value="Subscribe"/>
    </form>
    <p className={styles.privacy}>
      No spam. Unsubscribe anytime.
    </p>
  </div>
)

export default MiniNewsletter
