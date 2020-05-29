const assert = require('power-assert')
const bubbleSort = require('../../src/algorithm/bubbleSort')

describe('bubble sort test', () => {
  context('param is not an array object', () => {
    it('param is a number', () => {
      assert.equal(bubbleSort(1), false)
    })
    it('param is a string', () => {
      assert.equal(bubbleSort('hello world'), false)
    })
    it('param is boolean', () => {
      assert.equal(bubbleSort(true), false)
    })
    it('param is null', () => {
      assert.equal(bubbleSort(null), false)
    })
    it('param is an object', () => {
      assert.equal(bubbleSort({}), false)
    })
  })
  context('array sort', () => {
    let randData = [5, 34, 5, 45, 34, 65, 8, 34, 22, 55, 7, 233, 567]
    it('sorting', () => {
      assert.deepEqual(bubbleSort(randData), [5, 5, 7, 8, 22, 34, 34, 34, 45, 55, 65, 233, 567])
    })
  })
})
