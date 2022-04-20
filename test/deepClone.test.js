const assert = require('power-assert')
const deepClone = require('../src/deepClone')

describe('Deep clone test', () => {
  context('a deep clone target does not equal source object', () => {
    it('clone obj !== origin obj', (done) => {
      const originObj = {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}}
      const cloneObj = deepClone(originObj)
      assert.notEqual(cloneObj, originObj)
      done()
    })
  })
})