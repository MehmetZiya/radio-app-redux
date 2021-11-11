import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../actions/userActions'
import styles from '../css/Edit.module.css'
import Spinner from '../components/Spinner'

const Edit = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userEdit = useSelector((state) => state.userEdit)
  const { loading, error, success } = userEdit

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(username, password))
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
            required
          />
        </div>

        <div className={styles.registerButton}>
          <button onClick={handleSubmit}>Edit</button>
        </div>
      </form>
      {loading && <Spinner />}
      {success && <h1>User updated!</h1>}
      {error && <h1>{error}</h1>}
    </div>
  )
}

export default Edit
