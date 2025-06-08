import charactersData from '../constants/characters.json'
import episodesData from '../constants/episode.json'
import locationsData from '../constants/location.json'
import { CategoryType } from '../types/categoriesTypes'

//const fetchCharacters = async (): Promise<Character[]> => {
//  const response = await fetch('../constants/characters.json')
//  return response.json()
//}

//const fetchLocations = async (): Promise<Location[]> => {
//  const response = await fetch('../constants/location.json')
//  return response.json()
//}

//const fetchEpisodes = async (): Promise<Episode[]> => {
//  const response = await fetch('../constants/episode.json')
//  return response.json()
//}

export async function fetchMockData(category: CategoryType) {
  switch (category) {
    case 'characters':
      return charactersData
    case 'episodes':
      return episodesData
    case 'locations':
      return locationsData
    default:
      throw new Error('Неизвестная категория')
  }
}
