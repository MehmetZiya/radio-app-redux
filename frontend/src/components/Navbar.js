import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/logo.png'
import OutsideClick from './OutsideClick'
import styles from '../css/Navbar.module.css'
import { logout } from '../actions/userActions'
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons'

const Navbar = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [showDropdown, setShowDropdown] = useState(false)
  const navRef = useRef()

  const handleLogout = () => {
    setShowDropdown(false)
    dispatch(logout())
  }
  const handleClick = () => {
    setShowDropdown(!showDropdown)
  }
  const handleLinkClick = () => {
    setShowDropdown(false)
  }
  const handleClickOutside = () => {
    setShowDropdown(false)
  }

  OutsideClick(handleClickOutside, navRef)

  return (
    <nav
      className={`${styles.navbar} ${showDropdown && styles.dropstatus}`}
      ref={navRef}
    >
      {!showDropdown && (
        <div className={styles.logoLink}>
          <NavLink to='/'>
            {<img className={styles.logoImg} src={logo} alt='logo' />}
          </NavLink>
        </div>
      )}

      <div className={styles.menu}>
        <NavLink className={styles.navItem} to='/'>
          <i className='fas fa-home'></i> Home
        </NavLink>
        <NavLink className={styles.navItem} to='/channels'>
          <i className='fas fa-music'></i>Channels
        </NavLink>
        <NavLink className={styles.navItem} to='/programs'>
          <i className='fas fa-compass'></i> Programs
        </NavLink>
        <NavLink className={styles.navItem} to='/categories'>
          <i className='fas fa-sliders-h'></i> Categories
        </NavLink>

        {userInfo ? (
          <>
            <span>
              <NavLink className={styles.navItem} to='/users/mypage'>
                <i className='fas fa-tools'></i> My Page
              </NavLink>
            </span>

            <span>
              <NavLink className={styles.navItem} to='/' onClick={handleLogout}>
                <i className='fas fa-sign-out-alt'></i>Logout{' '}
              </NavLink>
            </span>
          </>
        ) : (
          <span>
            <NavLink className={styles.navItem} to='/login'>
              <i className='fas fa-user'> </i> Login
            </NavLink>
          </span>
        )}
      </div>

      {!showDropdown && (
        <MenuOutlined
          onClick={handleClick}
          className={`${styles.baricon}  ${showDropdown && styles.menubar}`}
        />
      )}
      {showDropdown && (
        <div className={styles.dropMenu}>
          <CloseCircleOutlined
            onClick={handleClick}
            className={styles.closeIcon}
          />
          <NavLink onClick={handleLinkClick} className={styles.navItem} to='/'>
            {' '}
            Home <i className='fas fa-home'></i>
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={styles.navItem}
            to='/channels'
          >
            Channels <i className='fas fa-music'></i>
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={styles.navItem}
            to='/programs'
          >
            {' '}
            Programs <i className='fas fa-compass'></i>{' '}
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={styles.navItem}
            to='/categories'
          >
            {' '}
            Categories <i className='fas fa-sliders-h'></i>{' '}
          </NavLink>

          {userInfo ? (
            <>
              <span>
                <NavLink
                  onClick={handleLinkClick}
                  className={styles.navItem}
                  to='/users/mypage'
                >
                  My Page <i className='fas fa-tools'></i>
                </NavLink>
              </span>
              <span>
                <NavLink
                  className={styles.navItem}
                  to='/'
                  onClick={handleLogout}
                >
                  Logout<i className='fas fa-sign-out-alt'></i>
                </NavLink>
              </span>
            </>
          ) : (
            <span>
              <NavLink
                onClick={handleLinkClick}
                className={styles.navItem}
                to='/login'
              >
                Login<i className='fas fa-user'> </i>
              </NavLink>
            </span>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
