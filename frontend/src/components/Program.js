import { useNavigate } from 'react-router-dom'

import styles from '../css/Program.module.css'

const Program = ({ program }) => {
  //const history = useHistory()
  const navigate = useNavigate()
  const goProgramDetails = () => {
    navigate(`/programs/${program.id}`)
    //history.push(`/programs/${program.id}`)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className={styles.card} onClick={goProgramDetails}>
        <img
          className={styles.image}
          src={program.programimage}
          alt={program.name}
        />
        <div className={styles.container}>
          <h6>{program.name}</h6>
        </div>
      </div>
    </>
  )
}

export default Program
