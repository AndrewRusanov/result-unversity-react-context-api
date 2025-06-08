import { SignIn } from '@/features/SignIn'
import { SignInFormData } from '@/features/SignIn/ui/SignIn'
import { SignUp } from '@/features/SignUp'
import { FormData } from '@/features/SignUp/ui/SignUp'
import { useAuth } from '@app/providers/AuthProvider'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'

const Login: FC = () => {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn')
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSignUpSubmit = (formData: FormData) => {
    auth?.signUp(formData, () => {
      setMode('signIn')
      alert('Регистрация прошла успешно!')
    })
  }

  const handleSignInSubmit = (formData: SignInFormData) => {
    const userData = localStorage.getItem(formData.email)

    if (!userData) {
      alert('Пользователь не найден')
      return
    }

    const user = JSON.parse(userData)
    if (user.password !== formData.password) {
      alert('Неверный пароль!')
      return
    }

    auth?.signIn(user, () => {
      navigate('/')
      alert(`Добро пожаловать, ${user.name}!`)
    })
  }

  const handleToggleMode = () => {
    setMode(prevMode => (prevMode === 'signIn' ? 'signUp' : 'signIn'))
  }

  return (
    <div className={styles.wrapper}>
      {mode === 'signIn' ? (
        <>
          <SignIn onSubmit={handleSignInSubmit} />
          <span className={styles.subtitle}>
            Ещё не зарегистрированы?{' '}
            <button
              type='button'
              onClick={handleToggleMode}
              className={styles.actionBtn}
            >
              Зарегистрироваться
            </button>
          </span>
        </>
      ) : (
        <>
          <SignUp onSubmit={handleSignUpSubmit} />
          <span className={styles.subtitle}>
            Уже зарегистрированы?{' '}
            <button
              type='button'
              onClick={handleToggleMode}
              className={styles.actionBtn}
            >
              Войти
            </button>
          </span>
        </>
      )}
    </div>
  )
}

export default Login
