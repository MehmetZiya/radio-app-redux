import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFav, getFav } from '../actions/userActions'
import Spinner from '../components/Spinner'
import Popup from '../components/Popup'
//import { USER_DELETE_FAV_RESET } from '../constants/userConstants'
import styles from '../css/MyPage.module.css'

const MyPage = () => {
  const dispatch = useDispatch()
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [showConfPopup, setConfShowPopup] = useState(false)
  const [favId, setFavId] = useState(null)
  const channelRef = useRef()
  const userDeleteFav = useSelector((state) => state.userDeleteFav)
  const {
    loading: deleteFavLoading,
    error: deleteFavError,
    success,
  } = userDeleteFav

  const userGetFav = useSelector((state) => state.userGetFav)
  const { loading: favListLoading, error: favListError, favList } = userGetFav

  useEffect(() => {
    dispatch(getFav())
  }, [dispatch, success])

  useEffect(() => {
    if (deleteFavError) {
      setShowErrorPopup(true)
      return () => {
        setTimeout(() => {
          setShowErrorPopup(false)
        }, 2500)
      }
    }
    /* return () => {
        dispatch({ type: USER_DELETE_FAV_RESET })
      } */
  }, [deleteFavError, dispatch, success])

  const handleClick = (e) => {
    e.preventDefault()
    setFavId(e.target.id)
    setConfShowPopup(true)
  }
  const handleDeleteClick = () => {
    dispatch(removeFav({ favId }))
    setConfShowPopup(false)
  }

  return (
    <div className={styles.myPageContainer}>
      <Link to='/users/edit'>
        <button>Edit Page</button>
      </Link>

      <div className={styles.loggedInWrapper}>
        <div className={styles.contentWrappers}>
          <h3>Favorite Channels</h3>

          <div className={styles.favoriteObjects}>
            {favList &&
              favList
                .filter((favorite) => favorite.classes === 'Channel')
                .map((favorite) => (
                  <div key={favorite.favId} className={styles.favoriteObject}>
                    <div className={styles.deleteBtn} onClick={handleClick}>
                      <i
                        ref={channelRef}
                        className='fas fa-times-circle 2-fa'
                        id={favorite._id}
                      ></i>
                    </div>
                    <Link to={`/channels/${favorite.favId}`}>
                      <img src={favorite.image} alt={favorite.name} />
                    </Link>
                    <p>{favorite.name}</p>
                  </div>
                ))}
            {favList &&
              favList.filter((favorite) => favorite.classes === 'Channel')
                .length === 0 && <p>You have not a favorite channel yet!</p>}
          </div>
        </div>
        <div className={styles.contentWrappers}>
          <h3>Favorite Programs</h3>
          <div className={styles.favoriteObjects}>
            {favList &&
              favList
                .filter((favorite) => favorite.classes === 'Program')
                .map((favorite) => (
                  <div key={favorite.favId} className={styles.favoriteObject}>
                    <div className={styles.deleteBtn} onClick={handleClick}>
                      <i
                        className='fas fa-times-circle 2-fa'
                        id={favorite._id}
                      ></i>
                    </div>
                    <Link to={`/programs/${favorite.favId}`}>
                      <img src={favorite.image} alt={favorite.name} />
                    </Link>
                    <p>{favorite.name}</p>
                  </div>
                ))}
            {favList &&
              favList.filter((favorite) => favorite.classes === 'Program')
                .length === 0 && <p>You have not a favorite program yet!</p>}
          </div>
        </div>
      </div>

      {favListLoading && <Spinner />}
      {favListError && <Popup error={favListError} />}

      {showConfPopup && (
        <div className={styles.fullPage}>
          <div className={styles.approveBox}>
            <p>Did you want to delete this favorite?</p>
            <div className={styles.btnGroup}>
              <button className={styles.deleteBttn} onClick={handleDeleteClick}>
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setConfShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteFavLoading && <Spinner />}
      {showErrorPopup && <Popup error={deleteFavError} />}
    </div>
  )
}

export default MyPage
