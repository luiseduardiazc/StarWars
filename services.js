const axios = require('axios')


const getData = (url) => {
  return axios.get(url)
}


const getFilms = () => {
  return new Promise((resolve, reject) => {
    getData('https://swapi.dev/api/films/').then((data) => {
      return resolve(data.data.results)
    })
      .catch((error) => {
        reject(error)
      })
  })

}


const starWarsData = async () => {

  const films = await getFilms()
  let data = []
  for (let film of films) {
    data.push({
      name: film.title,
      planets: film.planets,
      characters: film.characters,
      starships: film.starships
    })
  }
  return data
}


module.exports = {
  starWarsData
}