import {
  CategoryItem,
  CategoryType,
  Character,
  Location,
} from '@shared/types/categoriesTypes'
import { fetchMockData } from '@shared/utils/fetchData'
import { FC, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styles from './Details.module.scss'

interface Props {
  category: CategoryType
}

const Details: FC<Props> = ({ category }) => {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<CategoryItem | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMockData(category)

        const foundItem = data.find(dataItem => dataItem.id === Number(id))
        if (!foundItem) throw new Error('Элемент не найден 0_о')

        setItem(foundItem)
        setLoading(false)
      } catch (error) {
        setError(`${error}`)
        setLoading(false)
      }
    }
    fetchData()
  }, [category, id])

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка загрузки данных: {error}</div>
  if (!item) return <div>Элемент не найден 0_о</div>

  const isCharacter = (item: CategoryItem): item is Character => {
    return (item as Character).image !== undefined
  }

  const isLocation = (item: CategoryItem): item is Location => {
    return (item as Location).dimension !== undefined
  }

  return (
    <div className={styles.details}>
      <NavLink to={`/${category}`} className={styles.backLink}>
        Вернуться к {category}
      </NavLink>
      <div className={styles.content}>
        {isCharacter(item) && (
          <>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            <div className={styles.info}>
              <h1>{item.name}</h1>
              <div className={styles.status}>
                <span
                  className={`${styles.statusIndicator} ${
                    item.status === 'Alive'
                      ? styles.alive
                      : item.status === 'Dead'
                      ? styles.dead
                      : styles.unknown
                  }`}
                />
                {item.status} - {item.species}
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Пол:</span> {item.gender}
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Вид:</span> {item.species}
              </div>
            </div>
          </>
        )}

        {isLocation(item) && (
          <div className={styles.info}>
            <h1>{item.name}</h1>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Тип:</span> {item.type}
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Измерение:</span>{' '}
              {item.dimension || 'Unknown'}
            </div>
          </div>
        )}

        {!isCharacter(item) && !isLocation(item) && (
          <div className={styles.info}>
            <h1>{item.name}</h1>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Эпизод:</span> {item.episode}
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Дата выхода:</span>{' '}
              {item.air_date}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Details
