import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelDetails } from '../actions/channelActions'
import { addFav } from '../actions/userActions'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../css/ChannelDetails.module.css'
import Popup from '../components/Popup'

const ChannelDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [showSuccessPopup, setSuccessShowPopup] = useState(false)
  const channelId = params.channelId

  const channelDetails = useSelector((state) => state.channelDetails)
  const { loading, error, channel } = channelDetails

  const userAddFav = useSelector((state) => state.userAddFav)
  const { loading: addFavLoading, error: addFavError, success } = userAddFav

  useEffect(() => {
    dispatch(getChannelDetails(channelId))
  }, [dispatch, channelId])

  let bgColorObj = {}
  let textColorObj = {}

  if (channel) {
    bgColorObj = {
      background: `#${channel.color}`,
    }
    textColorObj = {
      color: `#${channel.color}`,
    }
  }

  const favChannel = {
    favId: channelId,
    classes: 'Channel',
    name: channel.name,
    image: channel.image,
  }

  const sendFavToDB = (e) => {
    e.preventDefault()
    dispatch(addFav(favChannel))
    if (addFavError) {
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
  }

  const goSchedule = () => {
    navigate(`/schedule/${channelId}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.channelContainer}>
      {channel && (
        <div className={styles.card} style={bgColorObj}>
          <div className={styles.backButton} onClick={() => navigate(-1)}>
            <i className='fas fa-arrow-alt-circle-left fa-2x'></i>
          </div>
          <img
            className={styles.image}
            src={channel.image}
            alt={channel.name}
          />
          <div className={styles.container}>
            <h3>
              <b>Channel Name: {channel.name}</b>
            </h3>
            <p>Channel Type : {channel.channeltype}</p>
          </div>

          {channel.liveaudio && (
            <audio controls className={styles.player}>
              <source src={channel.liveaudio.url} />
            </audio>
          )}

          <div className={styles.btnGrp}>
            <button style={textColorObj} onClick={sendFavToDB}>
              Add to Fav +
            </button>
            <button style={textColorObj} onClick={goSchedule}>
              Schedule
            </button>
          </div>
        </div>
      )}

      {channel && (
        <div className={styles.channelInfo} style={textColorObj}>
          <p>
            <strong>{channel.tagline}</strong>
          </p>
          <div className={styles.btn}>
            {channel.siteurl && (
              <a
                href={channel.siteurl}
                target='_blank'
                style={bgColorObj}
                rel='noopener noreferrer'
              >
                Channel Website
              </a>
            )}
            <Link to={`/channels/programs/${channelId}`} style={bgColorObj}>
              Channels Programs
            </Link>
          </div>
        </div>
      )}

      {loading && <Spinner />}
      {error && <h3>{error}</h3>}
      {addFavLoading && <Spinner />}

      {showPopup && <Popup error={`${channel.name} already added`} />}

      {showSuccessPopup && (
        <Popup success={`${channel.name} added your favorite list`} />
      )}
    </div>
  )
}

export default ChannelDetails
