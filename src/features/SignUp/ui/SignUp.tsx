import { AtIcon } from '@shared/assets/icons/AtIcon'
import { EmailIcon } from '@shared/assets/icons/EmailIcon'
import { GenderSelect, TextInput } from '@shared/ui'
import { FC, FormEvent, useState } from 'react'
import styles from './SignUp.module.scss'

export interface FormData {
  name: string
  nickname: string
  email: string
  gender: 'male' | 'female'
  password: string
}

type Errors = Record<keyof FormData, string>

interface Props {
  onSubmit: (formData: FormData) => void
}

const INITIAL_ERRORS = {
  name: '',
  nickname: '',
  email: '',
  gender: '',
  password: '',
}

const SignUp: FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState<string | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [password, setPassword] = useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>(INITIAL_ERRORS)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newErrors: Errors = INITIAL_ERRORS

    if (!name?.trim()) newErrors.name = 'Имя обязательно'
    if (!nickname?.trim()) newErrors.nickname = 'Никнейм обязателен'
    if (!email?.trim()) {
      newErrors.email = 'Email обязателен'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Некорректный email'
    }
    if (!password) {
      newErrors.password = 'Пароль обязателен'
    } else if (!validatePassword(password)) {
      newErrors.password = 'Пароль должен быть не менее 6 символов'
    }
    if (password !== confirmPassword) {
      newErrors.password = 'Пароли не совпадают'
    }

    if (Object.keys(newErrors).filter(Boolean).length > 0) {
      setErrors(newErrors)
    }

    setErrors(INITIAL_ERRORS)
    if (name && nickname && email && password) {
      onSubmit({ name, nickname, email, gender, password })
    }
  }

  return (
    <form className={styles.container} onSubmit={event => handleSubmit(event)}>
      <h1 className={styles.title}>Регистрация</h1>
      <TextInput
        id='Имя'
        variant='default'
        size='md'
        value={name}
        setValue={setName}
        type='text'
        label='Имя'
        description='Укажи своё имя'
        placeholder='Имя'
        required
        error={errors.name}
      />
      <TextInput
        id='Ник'
        variant='default'
        size='md'
        value={nickname}
        setValue={setNickname}
        type='text'
        label='Ник'
        description='Укажи свой ник'
        placeholder='l<0пVTьlч'
        required
        leftSection={<AtIcon />}
        error={errors.nickname}
      />
      <TextInput
        id='Почта'
        variant='default'
        size='md'
        value={email}
        setValue={setEmail}
        type='email'
        label='Почта'
        description='Укажи свою почту'
        placeholder='example@example.com'
        required
        leftSection={<EmailIcon />}
        error={errors.email}
      />
      <GenderSelect
        value={gender}
        setValue={setGender}
        label='Пол'
        size='md'
        required
        description='Укажите ваш пол'
        error={!gender && 'Поле обязательно для заполнения'}
      />
      <TextInput
        id='Пароль'
        variant='default'
        size='md'
        value={password}
        setValue={setPassword}
        type='password'
        label='Пароль'
        placeholder=''
        description='Пароль должен содержать более 6 символов'
        required
        error={errors.password}
      />
      <TextInput
        id='Пароль (повтор)'
        variant='default'
        size='md'
        value={confirmPassword}
        setValue={setConfirmPassword}
        type='password'
        label='Повтори пароль'
        description='Пароль должен содержать более 6 символов'
        placeholder=''
        required
      />
      <button type='submit' className={styles.submit_btn}>
        Зарегистрироваться
      </button>
    </form>
  )
}

export default SignUp
