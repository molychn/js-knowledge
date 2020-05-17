const path = require('path')
const resolve = p => path.resolve(__dirname, '../', p) //指定到src目录

const p = resolve('vue/index.js')
console.log(p) ///js-knowledge/src/vue/index.js