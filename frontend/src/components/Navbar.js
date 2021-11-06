import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'
//import { useHistory } from "react-router-dom";
import logo from '../assets/logo.png'
import OutsideClick from './OutsideClick'
import styles from '../css/Navbar.module.css'

import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons'

const Navbar = () => {
  //const history = useHistory();
  const loggedUser = true
  const [showDropdown, setShowDropdown] = useState(false)
  const navRef = useRef()

  const handleLogout = () => {
    setShowDropdown(false)
    // history.push("/");
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
            {' '}
            {<img className={styles.logoImg} src={logo} alt='logo' />}
          </NavLink>
        </div>
      )}

      <div className={styles.menu}>
        <NavLink className={styles.navItem} to='/'>
          <i class='fas fa-home'></i> Home
        </NavLink>
        <NavLink className={styles.navItem} to='/channels'>
          <i class='fas fa-music'></i>Channels
        </NavLink>
        <NavLink className={styles.navItem} to='/programs'>
          <i class='fas fa-compass'></i> Programs
        </NavLink>
        <NavLink className={styles.navItem} to='/categories'>
          <i class='fas fa-sliders-h'></i> Categories
        </NavLink>

        {loggedUser ? (
          <>
            <span>
              <NavLink className={styles.navItem} to='/users/mypage'>
                <i class='fas fa-tools'></i> My Page
              </NavLink>
            </span>

            <span>
              <NavLink className={styles.navItem} to='/' onClick={handleLogout}>
                <i class='fas fa-sign-out-alt'></i>Logout{' '}
              </NavLink>
            </span>
          </>
        ) : (
          <span>
            <NavLink className={styles.navItem} to='/login'>
              <i class='fas fa-user'> </i> Login
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
            Home <i class='fas fa-home'></i>
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={styles.navItem}
            to='/channels'
          >
            Channels <i class='fas fa-music'></i>
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={styles.navItem}
            to='/programs'
          >
            {' '}
            Programs <i class='fas fa-compass'></i>{' '}
          </NavLink>
          <NavLink
            onClick={handleLinkClick}
            className={styles.navItem}
            to='/categories'
          >
            {' '}
            Categories <i class='fas fa-sliders-h'></i>{' '}
          </NavLink>

          {loggedUser ? (
            <>
              <span>
                <NavLink
                  onClick={handleLinkClick}
                  className={styles.navItem}
                  to='/users/mypage'
                >
                  {' '}
                  My Page <i class='fas fa-tools'></i>
                </NavLink>
              </span>
              <span>
                <NavLink
                  className={styles.navItem}
                  to='/'
                  onClick={handleLogout}
                >
                  {' '}
                  Logout<i class='fas fa-sign-out-alt'></i>{' '}
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
                Login<i class='fas fa-user'> </i>
              </NavLink>
            </span>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
