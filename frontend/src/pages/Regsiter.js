import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'

import styles from '../css/Register.module.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(register(username, email, password))
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Register Form</h3>
        <div className={styles.input}>
          <label>Username :</label>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <p className={styles.psw}>
          Password must have at least one uppercase and one number
        </p>
        <Link to='/login' className={styles.loginLink}>
          Already registered? Login
        </Link>
        <div className={styles.registerButton}>
          <button>Register</button>
        </div>
      </form>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
    </>
  )
}

export default Register
