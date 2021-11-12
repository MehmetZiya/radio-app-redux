import React from 'react'
import 'animate.css'
import styles from '../css/Popup.module.css'

const Popup = (props) => {
  return props.success ? (
    <div className='animate__animated animate__backInDown'>
      <div className={styles.successPopup}>
        <p>
          <i className='fas fa-check-circle'></i> {props.success}
        </p>
      </div>
    </div>
  ) : props.error ? (
    <div className='animate__animated animate__backInDown'>
      <div className={styles.errorPopup}>
        <p>
          <i className='fas fa-exclamation-circle'></i> {props.error}
        </p>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default Popup
