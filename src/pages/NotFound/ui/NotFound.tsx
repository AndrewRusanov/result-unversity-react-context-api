import { NavLink } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404 - NotFound</h1>
      <p className={styles.subtitle}>
        Страница, которую вы ищете, не существует
      </p>
      <NavLink to='/' className={styles.homeLink}>
        На главную
      </NavLink>
    </div>
  )
}

export default NotFound
