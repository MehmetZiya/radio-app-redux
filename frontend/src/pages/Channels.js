import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Channel from '../components/Channel'
import SVRadio from '../assets/SVRadio.png'
import { allChannels } from '../actions/channelActions'
import styles from '../css/Channels.module.css'

const Channels = () => {
  const dispatch = useDispatch()

  const channelList = useSelector((state) => state.channelList)
  const { loading, error, channels } = channelList

  const [showChannels, setShowChannels] = useState([])
  const [number, setNumber] = useState(8)

  useEffect(() => {
    dispatch(allChannels())
  }, [dispatch])

  useEffect(() => {
    if (channels) {
      const showing = channels.slice(0, number)
      setShowChannels(showing)
    }
  }, [number, channels])

  const handleClick = () => {
    setNumber(number + 8)
  }
  return (
    <div>
      <div className={styles.logo}>
        <img src={SVRadio} alt='logo' />
      </div>
      <h1>All Channels</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      <div className={styles.channelCard}>
        {showChannels &&
          showChannels.map((channel) => (
            <Channel key={channel.id} channel={channel} />
          ))}
      </div>
      <div className={styles.button}>
        {channels && showChannels.length < channels.length && (
          <button onClick={handleClick}>Show More</button>
        )}
      </div>
    </div>
  )
}

export default Channels
