import { ChangeEvent, Dispatch, FC, ReactNode, SetStateAction } from 'react'
import type {
  TEXT_INPUT_RADIUS,
  TEXT_INPUT_SIZES,
  TEXT_INPUT_TYPES,
  TEXT_INPUT_VARIANTS,
} from '../../model/types/textInputTypes'
import styles from './TextInput.module.scss'

interface Props {
  id: string
  type: TEXT_INPUT_TYPES
  variant?: TEXT_INPUT_VARIANTS
  size?: TEXT_INPUT_SIZES
  radius?: TEXT_INPUT_RADIUS
  label: string
  placeholder: string
  required: boolean
  disabled?: boolean
  description?: string | null
  error?: string | boolean | null
  value: string | null
  leftSection?: ReactNode | null
  rightSection?: ReactNode | null
  setValue: Dispatch<SetStateAction<string | null>>
}

const TextInput: FC<Props> = props => {
  const {
    id,
    type,
    variant = 'default',
    size = 'md',
    radius = 'md',
    label,
    placeholder,
    required = false,
    description = null,
    error = null,
    value,
    leftSection,
    rightSection,
    setValue,
  } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    if (target) {
      setValue(event.target.value)
    }
  }

  const inputStyle = `${styles.input} ${styles[`input--variant-${variant}`]} ${
    styles[`input--${size}`]
  } ${styles[`input--radius-${radius}`]} ${error && styles[`input--error`]} ${
    leftSection && styles['input--withLeftSection']
  } ${rightSection && styles['input--withRightSection']}`

  return (
    <div className={styles.container}>
      <label
        htmlFor={id}
        className={`${styles.label} ${styles[`label--${size}`]}`}
      >
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
      <div className={styles.input_wrapper}>
        {leftSection && (
          <div
            className={`${styles.sectionLeft} ${
              styles[`sectionLeft--size-${size}`]
            }`}
          >
            {leftSection}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value || ''}
          placeholder={placeholder}
          required={required}
          onChange={e => handleChange(e)}
          className={inputStyle}
        />
        {rightSection && (
          <div
            className={`${styles.sectionRight} ${
              styles[`sectionRight--size-${size}`]
            }`}
          >
            {rightSection}
          </div>
        )}
      </div>
      {error && (
        <span className={`${styles.error} ${styles[`error--${size}`]}`}>
          {error}
        </span>
      )}
    </div>
  )
}

export default TextInput
