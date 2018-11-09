import React from 'react'
import styles from './newsletter.module.css'

const Newsletter = () => (
  <div className={styles.signupBox}>
    <h2 className={styles.title}>
      STAY UPDATED
    </h2>
    <p className={styles.message}>
    Join 5000+ fellow software engineers (from Google, Facebook, Microsoft, Quora, and more) who receive our curated weekly digest! <br/>
    </p>
    <form className={styles.form} action="https://discoverdev.us16.list-manage.com/subscribe/post" method="POST">
      <input type="hidden" name="u" value="c32352dc58bef5cdd7821a012"/>
      <input type="hidden" name="id" value="6aab40a607"/>
      <input type="email" autoCapitalize="off" autoCorrect="off" name="MERGE0" id="MERGE0" 
              className={styles.email} size="25" placeholder="Email"/>
      <br/>
      <input type="submit" className={styles.submit} value="Subscribe"/>
    </form>
    <p className={styles.privacy}>
      No spam. Unsubscribe anytime.
    </p>
  </div>
)

export default Newsletter
