const { getData, resolvePromises } = require('./utils')

const getFilms = (url) => {
  return new Promise((resolve, reject) => {
    getData(url).then((response) => {
      const { results } = response.data
      resolve(results)
    })
      .catch((error) => {
        reject(error)
      })
  })

}

const getPlanet = (url) => {
  return new Promise((resolve, reject) => {
    getData(url).then((response) => {
      const { name, terrain, gravity, diameter, population } = response.data
      resolve({
        name,
        terrain,
        gravity,
        diameter,
        population
      })
    })
      .catch((error) => {
        reject(error)
      })
  })
}

const getCharacter = (url) => {
  return new Promise((resolve, reject) => {
    getData(url).then((response) => {
      const { name, gender, hair_color, skin_color, eye_color, height, homeworld, species } = response.data
      resolve({
        name,
        gender,
        hair_color,
        skin_color,
        eye_color,
        height,
        homeworld,
        species
      })
    })
      .catch((error) => {
        reject(error)
      })
  })
}

const getStarShip = (url) => {
  return new Promise((resolve, reject) => {
    getData(url).then((response) => {
      const { name, model, manufacturer, passengers } = response.data
      resolve({
        name,
        model,
        manufacturer,
        passengers
      })
    })
      .catch((error) => {
        reject(error)
      })
  })
}


const starWarsData = async (url) => {

  const films = await getFilms(url)
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

const getStarWarsPromises = (films) => {
  return films.map(async (film) => {
    const planetsPromises = film.planets.map((planetUrl) => {
      return getPlanet(planetUrl)
    })

    const charactersPromises = film.characters.map((characterUrl) => {
      return getCharacter(characterUrl)
    })

    const starshipsPromises = film.starships.map((starshipUrl) => {
      return getStarShip(starshipUrl)
    })

    const planets = await resolvePromises(planetsPromises)
    const characters = await resolvePromises(charactersPromises)
    const starships = await resolvePromises(starshipsPromises)

    return ({
      ...film,
      planets,
      characters,
      starships
    })
  })
}


const starWarsFilms = (url) => {
  return new Promise((resolve, reject) => {
    starWarsData(url).then((films) => {
      const starWarsPromises = getStarWarsPromises(films)
      resolvePromises(starWarsPromises).then((starWarsFilms) => {
        resolve(starWarsFilms)
      })
        .catch((error) => {
          reject(error)
        })
    })
  })
}

module.exports = {
  starWarsFilms
}