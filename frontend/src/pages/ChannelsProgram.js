import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getChannelsProgram } from '../actions/channelActions'
import Spinner from '../components/Spinner'
import styles from '../css/ChannelsProgram.module.css'

const ChannelsProgram = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const channelId = params.channelId
  const [showPrograms, setShowPrograms] = useState([])
  const [number, setNumber] = useState(10)

  const channelsProgram = useSelector((state) => state.channelsProgram)
  const { loading, error, programs } = channelsProgram

  useEffect(() => {
    dispatch(getChannelsProgram(channelId))
  }, [dispatch, channelId])

  useEffect(() => {
    if (programs) {
      const showing = programs.slice(0, number)
      setShowPrograms(showing)
    }
  }, [number, programs])

  const handleClick = () => {
    setNumber(number + 10)
  }

  return (
    <div className={styles.progOfChannel}>
      <h2 className={styles.programTitle}>
        {programs[0].channel.name} Programs
      </h2>
      {loading && <Spinner />}
      {error && <h1>{error.message}</h1>}
      <span className={styles.back} onClick={() => navigate(-1)}>
        {' '}
        Back{' '}
      </span>
      <div className={styles.programs}>
        {programs &&
          showPrograms.map((program) => (
            <div className={styles.program} key={program.id}>
              <Link to={`/programs/${program.id}`} key={program.id}>
                <img src={program.programimage} alt={program.name} />
              </Link>
              <p>{program.name}</p>
            </div>
          ))}
      </div>
      <div className={styles.button}>
        {programs && showPrograms.length < programs.length && (
          <button onClick={handleClick}>Show More</button>
        )}
      </div>
    </div>
  )
}

export default ChannelsProgram
