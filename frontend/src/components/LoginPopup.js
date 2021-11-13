import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/LoginPopup.module.css'
const LoginPopup = () => {
  return (
    <div className={styles.popUpContainer}>
      <h2>You must login for adding favorite</h2>
      <Link to='/login' className={styles.loginLink}>
        Login
      </Link>
      <Link to='/register' className={styles.registerLink}>
        Not member? Register
      </Link>
    </div>
  )
}

export default LoginPopup
