import { useAuth } from '@/app/providers/AuthProvider'
import { SignOut } from '@/shared/assets/icons/SignOut'
import { Morty } from '@shared/assets/icons/Morty'
import { Rick } from '@shared/assets/icons/Rick'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    auth?.signOut(() => {
      navigate('/login')
    })
  }

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
        <button
          type='button'
          onClick={handleSignOut}
          className={styles.signOutBtn}
        >
          <SignOut />
        </button>
      </div>
    </div>
  )
}

export default Navbar
