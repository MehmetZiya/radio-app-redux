import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../actions/userActions'
import Spinner from '../components/Spinner'
import styles from '../css/Edit.module.css'
import Popup from '../components/Popup'
import { USER_EDIT_RESET } from '../constants/userConstants'

const Edit = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [showSuccessPopup, setSuccessShowPopup] = useState(false)

  const userEdit = useSelector((state) => state.userEdit)
  const { loading, error, success } = userEdit

  useEffect(() => {
    if (error) {
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 2500)
    }
    if (success) {
      setSuccessShowPopup(true)
      setTimeout(() => {
        setSuccessShowPopup(false)
      }, 2500)
    }
    dispatch({ type: USER_EDIT_RESET })
  }, [success, error, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(username, password))
    setTimeout(() => {
      navigate('/')
    }, 2500)
  }
  return (
    <div className={styles.myPageContainer}>
      <span className={styles.back} onClick={() => navigate(-1)}>
        {' '}
        Back{' '}
      </span>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Edit Form</h3>
        <div className={styles.input}>
          <label>Username :</label>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            placeholder={userInfo.username}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Email :</label>
          <input type='email' disabled value={userInfo.email} />
        </div>
        <div className={styles.input}>
          <label>Password :</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='New password'
            required
          />
        </div>

        <div className={styles.registerButton}>
          <button onClick={handleSubmit}>Edit</button>
        </div>
        {loading && <Spinner />}
        {showSuccessPopup && <Popup success={'User updated succesfully!'} />}
        {showPopup && <Popup error={error} />}
      </form>
    </div>
  )
}

export default Edit
