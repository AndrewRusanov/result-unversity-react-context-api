import { EmailIcon } from '@/shared/assets/icons/EmailIcon'
import { TextInput } from '@shared/ui'
import { FC, FormEvent, useState } from 'react'
import styles from './SignIn.module.scss'

export interface SignInFormData {
  email: string
  password: string
}

type Errors = Record<keyof SignInFormData, string>

interface Props {
  onSubmit: (formData: SignInFormData) => void
}

const INITIAL_ERRORS = {
  name: '',
  nickname: '',
  email: '',
  gender: '',
  password: '',
}

const SignIn: FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>(INITIAL_ERRORS)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newErrors: Errors = INITIAL_ERRORS

    if (!email?.trim()) {
      newErrors.email = 'Email обязателен'
    }
    if (!password) {
      newErrors.password = 'Пароль обязателен'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    }

    setErrors(INITIAL_ERRORS)
    if (email && password) {
      onSubmit({ email, password })
    }
  }

  return (
    <form className={styles.container} onSubmit={event => handleSubmit(event)}>
      <h1 className={styles.title}>Вход</h1>
      <TextInput
        id='Почта (вход)'
        variant='default'
        size='md'
        value={email}
        setValue={setEmail}
        type='email'
        label='Почта'
        description='Введи свою почту'
        placeholder='example@example.com'
        required
        leftSection={<EmailIcon />}
        error={errors.email}
      />
      <TextInput
        id='Пароль (вход)'
        variant='default'
        size='md'
        value={password}
        setValue={setPassword}
        type='password'
        label='Пароль'
        placeholder=''
        required
        error={errors.password}
      />
      <button type='submit' className={styles.submit_btn}>
        Войти
      </button>
    </form>
  )
}

export default SignIn
