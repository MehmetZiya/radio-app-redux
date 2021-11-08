import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProgramDetails } from '../actions/programActions'
import styles from '../css/ProgramDetails.module.css'
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from '@ant-design/icons'

const ProgramDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const programId = params.programId
  //const [ showAddMsg, setShowAddMsg] = useState(false);

  const navigate = useNavigate()
  const programDetails = useSelector((state) => state.programDetails)
  const { loading, error, program } = programDetails

  useEffect(() => {
    dispatch(getProgramDetails(programId))
  }, [dispatch, programId])

  const renderProgram = () => {
    if (program) {
      return (
        <div className={styles.progDetails}>
          {loading && <h1>Loading...</h1>}
          {error && <h1>{error.message}</h1>}
          <span className={styles.back} onClick={() => navigate(-1)}>
            {' '}
            Back{' '}
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
                <button>Add to Fav+</button>
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
        </div>
      )
    }
  }

  return program ? renderProgram() : <div></div>
}

export default ProgramDetails
