const assert = require('power-assert')
const Promise = require('../src/promise')

// 常规测试Promise操作
describe('Normal Testing Promise', () => {
  context('When test Promise normally', () => {
    // resolve正常返回一个res给onFulfilled
    it('return res by then function', (done) => {
      let p = new Promise((resolve, reject) => {
        resolve(1)
      })
      p.then(res => {
        assert.equal(res, 1)
        done()
      })
    })
    // reject正常返回一个err给onRejected
    it('return err by then function', (done) => {
      let p = new Promise((resolve, reject) => {
        reject(0)
      })
      p.then(null, err => {
        assert.equal(err, 0)
        done()
      })
    })
    // Promise的错误被catch捕获
    it('return err by catch function', (done) => {
      let p = new Promise((resolve, reject) => {
        reject(0)
      })
      p.then(null, null).catch(err => {
        assert.equal(err, 0)
        done()
      })
    })
    // 捕获onFulfilled过程中操作产生的error
    it('catch the err when onFulfilled return an error', (done) => {
      let p = new Promise((resolve, reject) => {
        resolve(1)
      })
      p.then(res => {
        throw new Error('err')
      }).catch(err => {
        assert(err.message === 'err')
        done()
      })
    })
  })
  context('When test Promise async', () => {
    it('setTimeout resolve function', (done) => {
      let p = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 10)
      })
      p.then(res => {
        assert(res === 1)
        done()
      })
    })
    it('setTimeout reject function', (done) => {
      let p = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(0)
        }, 10)
      })
      p.then(null, err => {
        assert(err === 0)
        done()
      })
    })
  })
  context('When thenable chain', () => {
    it('thenable chain', (done) => {
      let p = new Promise((resolve, reject) => {
        resolve(1)
      })
      p
      .then(res => {
        return 1
      })
      .then(res => {
        return 2
      })
      .then(res => {
        return 3
      })
      .then(res => {
        return 4
      })
      .then(res => {
        assert(res === 4)
        done()
      })
    })
    it('each then would return a new promise', (done) => {
      let p1 = new Promise((resolve) => {
        resolve(1)
      })
      let p2 = p1.then()
      assert(p1 !== p2)
      done()
    })
    it('catch function also return a new promise', (done) => {
      let p1 = new Promise((resolve, reject) => {
        reject(1)
      })
      let p2 = p1.catch()
      assert(p1 !== p2)
      done()
    })
  })
  context('When static function', () => {
    it('Promise.resolve', (done) => {
      Promise.resolve(1).then(res => {
        assert(res, 1)
        done()
      })
    })
    it('Promise.reject and catch the error by then function', (done) => {
      Promise.reject(0).then(null, err => {
        assert.equal(err, 0)
        done()
      })
    })
    it('Promise.reject and catch the error by catch function', (done) => {
      Promise.reject(0).catch(err => {
        assert.equal(err, 0)
        done()
      })
    })
    it('Promise.all resolves the result when all of promises resolved', (done) => {
      let p1 = Promise.resolve(1)
      let p2 = Promise.resolve(2)
      let p3 = Promise.resolve(3)
      Promise.all([p1, p2, p3]).then(res => {
        assert.equal(res.length, 3)
        done()
      })
    })
    it('Promise.all resolves the result when one of promises rejected', (done) => {
      let p1 = Promise.resolve(1)
      let p2 = Promise.resolve(2)
      let p3 = Promise.reject(3)
      Promise.all([p1, p2, p3]).catch(err => {
        assert.equal(err, 3)
        done()
      })
    })
    it('Promise.race resolves the result which one of promises handle faster', (done) => {
      let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 10)
      })
      let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(2)
        }, 20)
      })
      let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(3)
        }, 5)
      })
      Promise.race([p1, p2, p3]).then(res => {
        assert.equal(res, 1)
        done()
      }).catch(err => {
        assert.equal(err, 3)
        done()
      })
    })
  })
})