import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelDetails } from '../actions/channelActions'
import { Link } from 'react-router-dom'
import styles from '../css/ChannelDetails.module.css'
const ChannelDetails = ({ match }) => {
  const dispatch = useDispatch()
  const channelId = match.params.channelId
  const channelDetails = useSelector((state) => state.channelDetails)
  const { loading, error, channel } = channelDetails

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
  return (
    <div className={styles.channelContainer}>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {/* {showAddMsg && (
                <div>
                    { !addingErrMsg ? <p className={styles.registerMsg}>{addMsg}</p> : <p className={styles.errorMessage}>{addingErrMsg}</p>}
                </div>
                
            )} */}

      {channel && (
        <div className={styles.card} style={bgColorObj}>
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
          <audio controls className={styles.player}>
            <source src={channel.liveaudio.url} />
          </audio>
          <div className={styles.btnGrp}>
            <button style={textColorObj} /* onClick={sendFavToDB} */>
              Add to Fav +
            </button>
            <button style={textColorObj} /* onClick={goSchedule} */>
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
            <a
              href={channel.siteurl}
              target='_blank'
              style={bgColorObj}
              rel='noopener noreferrer'
            >
              {' '}
              Channel Website
            </a>
            <Link to={`/channels/programs/${channelId}`} style={bgColorObj}>
              Channels Programs
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChannelDetails
