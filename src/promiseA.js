// promise是一个包含then方法的对象或函数，该方法符合规范指定的行为
// thenable是一个包含then方法的对象或函数
// value是一个合法的任意JS值，包括undefined，thenable，promise
// exception用于throw抛出的值
// reason提示为什么一个promise被reject

// 校验小工具
const delay = (f, time = 0) => value => setTimeout(() => f(value), time)
const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isPromise = promise => promise instanceof Promise

// 一个promise一定具备三种状态：pending，fulfilled或rejected
// 当状态是pending时，它只能向fulfilled或rejected转变
// 如果已经是fulfilled状态了，则不能再向其他状态转变，且一定会有一个不可变的value
// 如果已经是rejected状态了，也不能向其他状态转变，且一定有一个不可变的reason
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise (f) {
  this.state = PENDING
  this.result = null
  this.handlers = []
  this.random = Math.random()
  console.log(this.random)

  let onFulfilled = value => transition(this, FULFILLED, value)
  let onRejected = reason => transition(this, REJECTED, reason)

  let ignore = false
  let resolve = value => {
    console.log('resolve', this.random)
    if (ignore) return
    ignore = true
    resolvePromise(this, value, onFulfilled, onRejected)
  }
  let reject = reason => {
    if (ignore) return
    onRejected(reason)
  }

  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

const transition = (promise, state, result) => {
  console.log('transition', promise.random)
  if (promise.state !== PENDING) return
  promise.state = state
  promise.result = result
  console.log('state', promise.state)
  notifyAll(promise)
}

// then方法需要接受onFulfilled和onRejected参数
// 如果onFulfilled和onRejected是函数，必须要多执行一次
// then可以被调用多次，每次注册一组onFulfilled和onRejected的callback，调用时需按照注册顺序调用
// then必须返回promise
Promise.prototype.then = function (onFulfilled, onRejected) {
  console.log(this.random, this.handlers)
  return new Promise((resolve, reject) => {
    this.handlers.push({onFulfilled, onRejected, resolve, reject})
    console.log(this.random, this.handlers, this.state)
    this.state !== PENDING && notifyAll(this)
  })
}

// 返回的promise有自己的state和result，它们将由onFulfilled和onRejected的行为指定
// 1.如果onFulfilled或onRejected返回一个value x，则运行Promise Resolution程序[[Resolve]](promise2, x)
// 2.如果onFulfilled和onRejected抛出了一个exception e，则promise2必须以这个e作为reason rejected
// 3.如果onFulfilled不是一个函数且promise1已经fulfilled，则promise2也需以相同的value切换到fulfilled状态
// 4.如果onRejected不是一个函数且promise1已经rejected，则promise2也需以相同的reason切换到rejected状态
const notify = (handler, state, result) => {
  let {onFulfilled, onRejected, resolve, reject} = handler
  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch (error) {
    reject(error)
  }
}
const notifyAll = delay(promise => {
  let {handlers, state, result, random} = promise
  console.log('notifyAll', random, handlers)
  while (handlers.length) {
    notify(handlers.shift(), state, result)
  }
})

// 对于value x的解释
// a.如果x是promise本身，抛出TypeError错误
// b.如果x是一个promise，那么沿用它的state和result状态，也就是按promise的流程进行
// c.如果x是一个Object或Function
  // 1.取then方法作为x.then
  // 2.如果检索x.then抛出错误e，则将e作为reason reject
  // 3.如果then是一个函数，则then.call(x, resolvePromise, rejectPromise)
    // I.如果resolvePromise called值为y，执行[[Resolve]](promise, y)
    // II.如果rejectPromise called值为r，reject
    // III.如果同时调用了resolvePromise和rejectPromise，或者对同一个参数进行了多次调用，则第一个调用优先，并且任何进一步的调用都将被忽略。
    // IV.如果call抛出错误，则忽略所有执行的resolvePromise和rejectPromise，同时reject该错误
  // 4.then不是函数，直接用x作为当前promise的fulfill value
const resolvePromise = (promise, result, resolve, reject) => {
  console.log('result: ', result)
  if (result === promise) {
    let reason = new TypeError('Can not fulfill promise with itself')
    return reject(reason)
  }
  if (isPromise(result)) {
    return result.then(resolve, reject)
  }
  if (isThenable(result)) {
    try {
      let then = result.then
      if (isFunction(then)) {
        return new Promise(then.bind(result)).then(resolve, reject)
      }
    } catch (error) {
      return reject(error)
    }
  }
  resolve(result)
}

Promise.prototype.catch = function(onRejected) {
	return this.then(null, onRejected)
}

Promise.resolve = value => new Promise(resolve => resolve(value))
Promise.reject = reason => new Promise((_, reject) => reject(reason))

Promise.all = (promises = []) => {
	return new Promise((resolve, reject) => {
		let count = 0
		let values = new Array(promises.length)
		let collectValue = index => value => {
			values[index] = value
			count += 1
			count === promises.length && resolve(values)
		}
		promises.forEach((promise, i) => {
			if (isPromise(promise)) {
				promise.then(collectValue(i), reject)
			} else {
				collectValue(i)(promise)
			}
		})
	})
}
Promise.race = (promises = []) => {
	return new Promise((resolve, reject) =>
		promises.forEach(promise => {
			if (isPromise(promise)) {
				promise.then(resolve, reject)
			} else {
				resolve(promise)
			}
		})
	)
}

module.exports = Promise