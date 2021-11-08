import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCategoryDetails,
  getProgramsByCategory,
} from '../actions/categoryActions'
import Program from '../components/Program'
import styles from '../css/ProgramsByCategory.module.css'

const ProgramsByCategory = () => {
  const [showPrograms, setShowPrograms] = useState([])
  const [number, setNumber] = useState(10)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const categoryId = params.categoryId

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const {
    loading: detailsLoading,
    error: detailsError,
    category,
  } = categoryDetails

  const programsByCategory = useSelector((state) => state.programsByCategory)
  const { loading, error, programs } = programsByCategory

  useEffect(() => {
    dispatch(getCategoryDetails(categoryId))
    dispatch(getProgramsByCategory(categoryId))
  }, [dispatch, categoryId])

  useEffect(() => {
    if (programs) {
      const showing = programs.slice(0, number)
      setShowPrograms(showing)
    }
  }, [number, programs])

  const handleClick = () => {
    setNumber(number + 8)
  }

  return (
    <div className={styles.categoryContainer}>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {detailsLoading && <h1>Loading...</h1>}
      {detailsError && <h1>{detailsError.message}</h1>}
      {programs && (
        <div className={styles.allProgs}>
          <span className={styles.back} onClick={() => navigate(-1)}>
            {' '}
            Back{' '}
          </span>
          <div>
            <h2 className={styles.categoryName}>{category.name}</h2>
            <div className={styles.programWrapper}>
              {programs &&
                showPrograms.map((program) => (
                  <Program key={program.id} program={program} />
                ))}
            </div>
          </div>

          <div className={styles.button}>
            {programs && showPrograms.length < programs.length && (
              <button onClick={handleClick}>Show More</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramsByCategory
