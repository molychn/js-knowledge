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
})
