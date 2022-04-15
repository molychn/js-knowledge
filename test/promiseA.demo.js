const Promise = require("../src/promiseA")

// 1. new Promise实例化一个Promise实例，以一个fun作为参数，并向该fun注入了resolve和reject
// 2. fun会被立即执行，如果fun内部程序有错会直接被try-catch捕获
// 3. fun执行完后可将结果进行resolve或reject
  // a. 进入resolve阶段处罚resolvePromise
    // I. 判断result是不是promise1，是则直接reject报错
    // II. 如果result是一个新的promise，则调用result.then方法，并将当前的resolve，reject传递进去
    // III. 如果不是promise但却具有then方法，则尝试call调用它
    // IV. 以上都不是的情况下执行resolve，改变promise1的state状态，执行transition
    // V. transition更改state，存储result，并按顺序执行完handlers队列的所有任务
// let promise1 = new Promise((resolve, reject) => {
//   console.log('promise1')
//   // do something then resolve or reject
//   let result = 1
//   resolve(result)
// }).then(res => {
//   console.log('res: ', res)
//   return Promise.resolve(2)
// }).then(res1 => {
//   console.log('res1: ', res1)
//   return new Error('return an error')
// }).then(res2 => {
//   console.log('res2: ', res2)
// })

// new Promise初始化了第一个Promise实例 promise1
// 执行promise1内的程序
// 遇到resolve后执行resolvePromise
// resolvePromise判断完所有条件后执行传进的onFulfilled方法，更改promise1状态
// 遇到第一个then方法，实例第二个promise2，同时将promise1相关的onFulfilled，onRejected与promise2的resolve，reject插入到promise1的handlers队列中
// 执行promise1的notifyAll，利用setTimeout将notifyAll任务暂时挂起
// 遇到第二个then方法，实例第三个promise3，将promise2相关的onFulfilled，onRejected与promise3的resolve，reject插入到promise2的handlers队列中，此时promise2的状态还是pending
// promise2后续没有其他then方法执行了，此时执行promise1的notifyAll任务，触发它的resolve
// promise2的resolve改变了状态，同时执行自己的notifyAll，触发promise3的resolve，但promise3没有在return值，其handlers队列也是空的，所以notifyAll也不会执行

// const delay = (f, time = 0) => value => setTimeout(() => f(value), time)
// const notifyAll = delay(() => {
//   console.log('test')
// })
// notifyAll()
// notifyAll()

let promise0 = new Promise((resolve, reject) => {
	resolve(1)
	reject(new Error('something wrong'))
})
promise0.then(result => {
	return Promise.resolve(2)
}, error => {
	// it may receive the error about 'something wrong'
	console.log(error)
}).then(result1 => {
	return 3
}).then(result2 => {
	// console.log(result2)
  return 4
})