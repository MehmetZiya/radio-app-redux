import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Program from '../components/Program'
import SVRadio from '../assets/SVRadio.png'
import { allPrograms } from '../actions/programActions'
import styles from '../css/Programs.module.css'

const Programs = () => {
  const dispatch = useDispatch()

  const programList = useSelector((state) => state.programList)
  const { loading, error, programs } = programList

  const [showPrograms, setShowProgramss] = useState([])
  const [number, setNumber] = useState(8)

  useEffect(() => {
    dispatch(allPrograms())
  }, [dispatch])

  useEffect(() => {
    if (programs) {
      const showing = programs.slice(0, number)
      setShowProgramss(showing)
    }
  }, [number, programs])

  const handleClick = () => {
    setNumber(number + 8)
  }
  return (
    <>
      <div className={styles.programContainer}>
        <div className={styles.logo}>
          <img src={SVRadio} alt='logo' />
        </div>
        <h1>All Programs</h1>
        {loading && <h1>Loading...</h1>}
        {error && <h1>{error.message}</h1>}
        <div className={styles.allProgram}>
          {showPrograms &&
            showPrograms.map((program) => (
              <Program key={program.id} program={program} />
            ))}
        </div>
        <div className={styles.button}>
          {programs && showPrograms.length < programs.length && (
            <button onClick={handleClick}>Show More</button>
          )}
        </div>
      </div>
    </>
  )
}

export default Programs
