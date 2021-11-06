import React from 'react'
import { useHistory } from 'react-router-dom'
import channelImg from '../assets/channel.jpg'
import styles from '../css/Channel.module.css'

const Channel = ({ channel }) => {
  const history = useHistory()
  const goChannelDetails = () => {
    history.push(`/channels/${channel.id}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.card} onClick={goChannelDetails}>
      {channel.image ? (
        <img className={styles.image} src={channel.image} alt={channel.name} />
      ) : (
        <img src={channelImg} alt={channel.name} />
      )}

      <div className={styles.container}>
        <h4>{channel.name}</h4>
        <p>{channel.channeltype}</p>
      </div>
    </div>
  )
}

export default Channel
