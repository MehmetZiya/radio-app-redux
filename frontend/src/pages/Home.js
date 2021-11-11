import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SVRadio from '../assets/SVRadio.png'
import Channel from '../components/Channel'
import Program from '../components/Program'
import { allChannels } from '../actions/channelActions'
import { allPrograms } from '../actions/programActions'
import { allCategories } from '../actions/categoryActions'
import styles from '../css/Home.module.css'
import Spinner from '../components/Spinner'

const Home = () => {
  const dispatch = useDispatch()
  const channelList = useSelector((state) => state.channelList)
  const { loading, error, channels } = channelList

  const programList = useSelector((state) => state.programList)
  const {
    loading: programsLoading,
    error: programsError,
    programs,
  } = programList

  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = categoryList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [showChannels, setShowChannels] = useState([])
  const [showPrograms, setShowPrograms] = useState([])
  const [showCategories, setShowCategories] = useState([])

  useEffect(() => {
    dispatch(allChannels())
    dispatch(allPrograms())
    dispatch(allCategories())
  }, [dispatch])

  useEffect(() => {
    if (channels) {
      const showChannel = channels.slice(0, 4)
      setShowChannels(showChannel)
    }
  }, [channels])

  useEffect(() => {
    if (programs) {
      const showPrograms = programs.slice(84, 96)
      setShowPrograms(showPrograms)
    }
  }, [programs])

  useEffect(() => {
    if (categories) {
      const showCategories = categories.slice(6, 12)
      setShowCategories(showCategories)
    }
  }, [categories])

  return (
    <div>
      <div className={styles.topChannels}>
        <div className={styles.logo}>
          <img src={SVRadio} alt='logo' />
        </div>
        {userInfo && (
          <p className={styles.greeting}>Wellcome {userInfo.username}!</p>
        )}
        <h2 className={styles.popChannelTitle}>Populer Channels</h2>

        <div className={styles.channelCard}>
          {loading && <Spinner />}
          {error && <h1>{error.message}</h1>}
          {channels &&
            showChannels.map((channel) => (
              <Channel key={channel.id} channel={channel} />
            ))}
        </div>

        <Link to={'/channels'}>
          <div className={styles.button}>Show All Cahnnels</div>
        </Link>
      </div>
      <hr />
      <div className={styles.programWrapper}>
        <div className={styles.topPrograms}>
          <h2>Populer Programs</h2>

          <div className={styles.channelCard}>
            {programsLoading && <Spinner />}
            {programsError && <h1>{error.message}</h1>}
            {programs &&
              showPrograms.map((program) => (
                <Program key={program.id} program={program} />
              ))}
          </div>
          <Link to={'/programs'}>
            <div className={styles.button}>Show All Programs</div>
          </Link>
        </div>
      </div>

      <hr />
      <div className={styles.topCategories}>
        <h2>Populer Categories</h2>

        <div className={styles.categoryWrapper}>
          {categoryLoading && <Spinner />}
          {categoryError && <h1>{error.message}</h1>}
          {categories &&
            showCategories.map((category) => (
              <Link
                to={`/categories/programs/${category.id}`}
                key={category.id}
                className={styles.category}
              >
                <p>
                  <b>{category.name}</b>
                </p>
              </Link>
            ))}
        </div>
        <Link to={'/categories'}>
          <div className={styles.button}>Show All Categories</div>
        </Link>
      </div>
    </div>
  )
}

export default Home
