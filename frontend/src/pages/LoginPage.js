import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import styles from '../css/Register.module.css'
import Spinner from '../components/Spinner'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <h3>Login Form</h3>
        <div className={styles.input}>
          <label>Email :</label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Password :</label>

          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Link to='/register' className={styles.registerLink}>
          Not member? Register
        </Link>
        <div className={styles.loginButton}>
          <button type='submit'>Login</button>
        </div>
        {}
      </form>
      {loading && <Spinner />}
      {error && <h1>{error}</h1>}
    </>
  )
}

export default LoginPage
