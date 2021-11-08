import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getChannelSchedule } from '../actions/channelActions'
import styles from '../css/ChannelSchedule.module.css'
const ChannelScedule = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const channelId = params.channelId

  const channelSchedule = useSelector((state) => state.channelSchedule)
  const { loading, error, schedule } = channelSchedule
  const convertToDateObject = (SRTimeString) => {
    return new Date(
      // eslint-disable-next-line no-useless-escape
      parseInt(SRTimeString.replace(/[\/\(\)date]/gi, ''))
    ).toLocaleString()
  }

  useEffect(() => {
    dispatch(getChannelSchedule(channelId))
  }, [dispatch, channelId])

  return (
    <div className={styles.scheduleContainer}>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      <span className={styles.back} onClick={() => navigate(-1)}>
        {' '}
        Back{' '}
      </span>
      <h2>Schedule</h2>
      {schedule &&
        schedule.map((part, i) => (
          <div className={styles.table} key={i}>
            <h4>{convertToDateObject(part.starttimeutc)}</h4>
            <p className={styles.title}>{part.title}</p>
          </div>
        ))}
    </div>
  )
}

export default ChannelScedule
