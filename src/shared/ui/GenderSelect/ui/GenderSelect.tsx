import { Dispatch, FC, SetStateAction } from 'react'
import styles from './GenderSelect.module.scss'

interface Props {
  value: 'male' | 'female' | null
  label: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  required?: boolean
  error?: string | boolean | null
  description?: string | null
  setValue: Dispatch<SetStateAction<'male' | 'female'>>
}

const GenderSelect: FC<Props> = props => {
  const {
    value,
    label,
    size = 'md',
    required = false,
    error = null,
    description = null,
    setValue,
  } = props

  const handleChange = (gender: 'male' | 'female') => {
    setValue(gender)
  }

  return (
    <div className={styles.container}>
      <label className={`${styles.label} ${styles[`label--${size}`]}`}>
        {label}
        {required && <span className={styles.requiredStar}>*</span>}
      </label>
      {description && (
        <span
          className={`${styles.description} ${styles[`description--${size}`]}`}
        >
          {description}
        </span>
      )}
      <div className={styles.options}>
        <label className={styles.option}>
          <input
            type='radio'
            name='gender'
            checked={value === 'male'}
            onChange={() => handleChange('male')}
            className={styles.radioInput}
          />
          <span
            className={`${styles.radioControl} ${
              value === 'male' ? styles.radioControlChecked : ''
            }`}
          ></span>
          <span className={styles.optionLabel}>Мужской</span>
        </label>

        <label className={styles.option}>
          <input
            type='radio'
            name='gender'
            checked={value === 'female'}
            onChange={() => handleChange('female')}
            className={styles.radioInput}
          />
          <span
            className={`${styles.radioControl} ${
              value === 'female' ? styles.radioControlChecked : ''
            }`}
          ></span>
          <span className={styles.optionLabel}>Женский</span>
        </label>
      </div>

      {error && (
        <span className={`${styles.error} ${styles[`error--${size}`]}`}>
          {typeof error === 'string'
            ? error
            : 'Поле обязательно для заполнения'}
        </span>
      )}
    </div>
  )
}

export default GenderSelect
