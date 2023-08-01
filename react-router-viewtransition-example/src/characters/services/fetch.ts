import { API_CHARACTERS_ENDPOINT } from '../../constants'

export const fetchCharacters = async () => {
  return await fetch(API_CHARACTERS_ENDPOINT)
    .then(async (response) => await response.json())
    .then((data) => data.results)
}
