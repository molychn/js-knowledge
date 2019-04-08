let PENDING = 0
let FULFILLED = 1
let REJECTED  = 2


/**
 *
 * @param {object:function} exec 构造器resolve和reject方法
 */
function Promise (exec) {
  let self = this //存储this指向
  self.status = PENDING
  self.value = undefined
  self.handlers = []

  // 处理fulfilled和reject两种状态的方法
  // 改变promise状态，同时存储结果，准备在then方法中返回
  self.fulfill = function (value) {
    self.status = FULFILLED
    self.value = value
  }
  self.reject = function (reason) {
    // console.log('reject')
    self.status = REJECTED
    self.value = reason
    self.handler()
  }

  self.resolve = function (value) {
    if (self.status === FULFILLED) return
    try {
      let then = getThen(value)
      if (then) {
        doResolve(then.bind(value), self.resolve, self.reject)
        return
      }
      self.fulfill(value)
      self.handler()
    } catch (error) {
      self.reject(error)
    }
  }
  // reject默认直接由原始状态方法返回，不做另外封装


  exec(self.resolve, self.reject) //将resolve和reject回调出去
}


Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this
  // console.log('then process')
  return new Promise(function (resolve, reject) {
    return self.done(function (result) {
      if (typeof onFulfilled === 'function') {
        try {
          // console.log('resolve1')
          // onFulfilled(result)
          resolve(onFulfilled(result))
        } catch (err) {
          reject(err)
        }
      } else {
        // console.log('resolve2')
        resolve(result)
      }
    }, function (error) {
      if (typeof onRejected === 'function') {
        try {
          // console.log('resolve3')
          reject(onRejected(error))
        } catch (err) {
          reject(err)
        }
      } else {
        reject(error)
      }
    })
  })
}
Promise.prototype.catch = function (callback) {
  // console.log('catch the error')
  let self = this
  return self.then(null, callback)
}
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let arr = []  //最终返回结果
    let i = 0
    function processData (x, y) {
      arr[x] = y
      if (++i === promises.length) {
        resolve(arr)
      }
    }
    for (let j = 0; j < promises.length; j++) {
      promises[j].then(function (res) {
        processData(j, res)
      }, reject)
    }
  })
}
Promise.race = function (promises) {
  let done = false
  let p = new Promise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(function(res) {
        if (done) return
        done = true
        resolve(res)
      }, function(err){
        if (done) return
        done = true
        reject(err)
      })
    }
  })
  return p
}

Promise.resolve = function (value) {
  try {
    let then = getThen(value)
    if (then) {
      return new Promise(then.bind(value))
    }
  } catch (err) {
    return new Promise(function (resolve, reject) {
      reject(err)
    })
  }
  return valuePromise(value)
}
Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason)
  })
}

Promise.prototype.done = function (onFulfilled, onRejected) {
  // console.log(`done`)
  let self = this
  setTimeout(function () {
    self.handle({
      onFulfilled: onFulfilled,
      onRejected: onRejected
    })
  }, 0)
}

Promise.prototype.handle = function(handler) {
  // console.log('handle')
  let self = this
  if (self.status === PENDING) {
    // console.log('pending')
    self.handlers.push(handler)
  } else {
    if (self.status === FULFILLED && typeof handler.onFulfilled === 'function') {
      // console.log('onFulfilled')
      handler.onFulfilled(self.value)
    }
    if (self.status === REJECTED && typeof handler.onRejected === 'function') {
      // console.log('onRejected')
      handler.onRejected(self.value)
    }
  }
}

Promise.prototype.handler = function () {
  let self = this
  self.handlers.forEach(function(handle) {
    self.handle(handle)
  })
}

function getThen (value) {
  let t = typeof value
  if (value && (t === 'object' || t === 'function')) {
    var then = value.then
    if (typeof then === 'function') {
      return then
    }
  }
  return null
}
function doResolve (fn, onFulfilled, onRejected) {
  let done = false
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (error) {
    if (done) return
    done = true
    onRejected(error)
  }
}
function valuePromise (value) {
  let p = new Promise(function () {})
  p.status = FULFILLED
  p.value = value
  return p
}

module.exports = Promise
