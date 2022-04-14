// let window = {
//   double: n => n * 2
// }
// let pipe = function (value) {
//   let funcStack = []
//   let oproxy = new Proxy({}, {
//     get: function (pipeObject, fnName) {
//       console.log('pipeObject: ', pipeObject)
//       console.log('fnName: ', fnName)
//       if (fnName === 'get') {
//         return funcStack.reduce(function (val, fn) {
//           return fn(val)
//         }, value)
//       }
//       funcStack.push(window[fnName])
//       return oproxy
//     }
//   })
//   return oproxy
// }

// let double = n => n * 2

// // pipe(3).double
// console.log('pipe(3)', pipe(3).double.get)

// const target = Object.defineProperties({}, {
//   foo: {
//     value: 123,
//     writable: false,
//     configurable: false
//   },
// });

// const handler = {
//   get(target, propKey) {
//     return 'abc';
//   }
// };

// const proxy = new Proxy(target, handler);

// proxy.foo