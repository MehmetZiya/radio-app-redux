import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProgramDetails } from '../actions/programActions'
import { addFav } from '../actions/userActions'
import Spinner from '../components/Spinner'
import Popup from '../components/Popup'
import LoginPopup from '../components/LoginPopup'
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from '@ant-design/icons'
import { USER_ADD_FAV_RESET } from '../constants/userConstants'
import styles from '../css/ProgramDetails.module.css'

const ProgramDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const programId = params.programId
  const [showPopup, setShowPopup] = useState(false)
  const [showSuccessPopup, setSuccessShowPopup] = useState(false)

  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const programDetails = useSelector((state) => state.programDetails)
  const { loading, error, program } = programDetails

  const userAddFav = useSelector((state) => state.userAddFav)
  const { loading: addFavLoading, error: addFavError, success } = userAddFav

  useEffect(() => {
    dispatch(getProgramDetails(programId))
  }, [dispatch, programId])

  const FavProgram = {
    favId: programId,
    classes: 'Program',
    name: program.name,
    image: program.programimage,
  }
  useEffect(() => {
    if (addFavError) {
      setShowPopup(true)
    }
    if (success) {
      setSuccessShowPopup(true)
    }
    return () => {
      dispatch({ type: USER_ADD_FAV_RESET })
      setTimeout(() => {
        setShowPopup(false)
      }, 2500)
      setTimeout(() => {
        setSuccessShowPopup(false)
      }, 2500)
    }
  }, [success, addFavError, dispatch])

  const sendFavToDB = (e) => {
    e.preventDefault()
    dispatch(addFav(FavProgram))
  }

  const renderProgram = () => {
    if (program) {
      return (
        <div className={styles.progDetails}>
          <span className={styles.back} onClick={() => navigate(-1)}>
            Back
          </span>
          <div className={styles.sections}>
            <div className={styles.sectionA}>
              <img
                src={program.programimage}
                alt={program.name}
                className={styles.programImage}
              />
              <h2>{program.name}</h2>
              <p className={styles.description}>
                <b>Program Details :</b>
                {program.description}
              </p>
              <div className={styles.addButton}>
                <button onClick={sendFavToDB}>Add to Fav+</button>
              </div>
            </div>

            <div className={styles.sectionB}>
              <a
                className={styles.url}
                href={program.programurl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                Program Website
              </a>
              <div className={styles.socialMediaIcons}>
                {program.socialmediaplatforms &&
                  program.socialmediaplatforms.map((platform, i) => (
                    <a key={i} href={platform.platformurl}>
                      {platform.platform === 'Facebook' ? (
                        <FacebookFilled />
                      ) : platform.platform === 'Twitter' ? (
                        <TwitterSquareFilled />
                      ) : (
                        <InstagramFilled />
                      )}
                    </a>
                  ))}
              </div>

              <h4>Contact</h4>
              <p>
                <b>Responsible Editor : </b>
                {program.responsibleeditor}
              </p>
              {program.email ? (
                <p>
                  <b>E-mail :</b>
                  <a href={`mailto:${program.email}`}>{program.email}</a>
                </p>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className={styles.popupContainer}>
            {loading && <Spinner />}
            {error && <h3>{error}</h3>}
            {addFavLoading && <Spinner />}
            {showPopup && !userInfo && <LoginPopup />}
            {showPopup && userInfo && <Popup error={`Program already added`} />}

            {showSuccessPopup && (
              <Popup success={`Program added your favorite list`} />
            )}
          </div>
        </div>
      )
    }
  }

  return program ? renderProgram() : <div></div>
}

export default ProgramDetails
