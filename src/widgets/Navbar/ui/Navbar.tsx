import { Morty } from '@shared/assets/icons/Morty'
import { Rick } from '@shared/assets/icons/Rick'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to='/' className={styles.logo}>
        <Rick />
        <Morty />
        Rick & Morty
      </NavLink>
      <div className={styles.links}>
        <NavLink to='/characters' className={styles.link}>
          Персонажи
        </NavLink>
        <NavLink to='/episodes' className={styles.link}>
          Эпизоды
        </NavLink>
        <NavLink to='/locations' className={styles.link}>
          Локации
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
