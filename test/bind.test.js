// const assert = require('power-assert')
import assert from 'power-assert'
require('../src/bind')

describe('Where the this point for?', () => {
  context('When f1 bind the o1 object', () => {
    it('this should be pointed to o1', () => {
      let o1 = {a: 1}
      let f = function () {
        return this
      }
      let f1 = f.bind(o1)
      assert(f1() === o1)
    })
    it('func f1 has been preset pramas by func bind', () => {
      let o2 = {a: 1}
      let f = function () {
        return Array.prototype.slice.call(arguments)
      }
      let f1 = f.bind(o2, 1, 2)
      let res = f1()
      assert(res.length === 2)
    })
  })
  context('When new the binded func', () => {
    it('this just have prop c', () => {
      let o3 = {a: 1}
      let f = function () {
        this.c = 42
      }
      let f1 = f.bind(o3)
      let res = new f1()
      assert(res.c === 42)
    })
  })
})
