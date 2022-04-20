const whatUrTypeIs = require('./whatUrTypeIs')
const deepClone =  (obj) => {
  if (whatUrTypeIs(obj) !== 'object'
    || whatUrTypeIs(obj) !== 'array'
  ) return null

  let ret = whatUrTypeIs(obj) === 'object' ? {} : []

  for (let x in obj) {
    if (obj.hasOwnProperty(x)) {
      if (obj[x] && typeof obj[x] === 'object') {
        ret[x] = whatUrTypeIs(obj[x]) === 'object' ? {} : []
        ret[x] = deepClone(obj[x])
      } else {
        ret[x] = obj[x]
      }
    }
  }

  return ret
}

module.exports = deepClone