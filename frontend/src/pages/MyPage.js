import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFav, getFav } from '../actions/userActions'
import Spinner from '../components/Spinner'
import styles from '../css/MyPage.module.css'

const MyPage = () => {
  const dispatch = useDispatch()
  const userDeleteFav = useSelector((state) => state.userDeleteFav)
  const { loading, error, success } = userDeleteFav

  const userDGetFav = useSelector((state) => state.userGetFav)
  const { loading: favListLoading, error: favListError, favList } = userDGetFav

  useEffect(() => {
    dispatch(getFav())
  }, [dispatch])

  useEffect(() => {}, [success])
  const handleClick = (e) => {
    e.preventDefault()
    dispatch(removeFav({ favId: e.target.id }))
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
                    <Link to={`/channels/${favorite.favId}`}>
                      <img src={favorite.image} alt={favorite.name} />
                    </Link>
                    <p>{favorite.name}</p>
                    <button id={favorite._id} onClick={handleClick}>
                      Remove
                    </button>
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
                    <Link to={`/programs/${favorite.favId}`}>
                      <img src={favorite.image} alt={favorite.name} />
                    </Link>
                    <p>{favorite.name}</p>
                    <button id={favorite._id} onClick={handleClick}>
                      Remove
                    </button>
                  </div>
                ))}
            {favList &&
              favList.filter((favorite) => favorite.classes === 'Program')
                .length === 0 && <p>You have not a favorite program yet!</p>}
          </div>
        </div>
      </div>
      {loading && <Spinner />}
      {success && <h1>Fav removed!</h1>}
      {error && <h1>{error}</h1>}
      {favListLoading && <Spinner />}
      {favListError && <h1>{error}</h1>}
    </div>
  )
}

export default MyPage
