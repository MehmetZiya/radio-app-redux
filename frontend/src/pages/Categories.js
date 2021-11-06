import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allCategories } from '../actions/categoryActions'
import SVRadio from '../assets/SVRadio.png'
import styles from '../css/Categories.module.css'

const Categories = () => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList

  useEffect(() => {
    dispatch(allCategories())
  }, [dispatch])

  return (
    <div className={styles.container}>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      <div className={styles.logo}>
        <img src={SVRadio} alt='logo' />
      </div>
      <h1>All Categories</h1>
      <div className={styles.categoryWrapper}>
        {categories &&
          categories.map((category) => (
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
    </div>
  )
}

export default Categories
