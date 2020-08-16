const { get } = require('axios')


const getData = (url) => {
  return get(url)
}


const resolvePromises = (promises) => {
    return new Promise((resolve, reject) => {
      Promise.all(promises).then((data) => {
        resolve(data)
      })
        .catch((error) => {
          reject(error)
        })
    })
  }

module.exports = {
    getData,
    resolvePromises
}