function new1 (a, b) {
  this.a = a
  this.b = b
}
let res1 = new new1(0, 1)
//返回{a: 0, b: 1}
console.log(res1)

function new2 (a, b) {
  this.a = a
  this.b = b
  return {
    c: 1
  }
}
let res2 = new new2(1, 2)
//在构造函数有返回对象时，返回原有对象{c: 1}，其次才返回构造对象
console.log(res2)

function new3 () {
  this.a = 1
}
let res3 = new new3()
// new操作符先创建一个空对象
// 而后将函数new3的prototype赋值给空对象的__proto__
// 最后通过call操作将this绑定在空对象上
// 返回该空对象
console.log(res3.__proto__ === new3.prototype)

function new4 () {}
let res4 = new new4()
// res4本身没有prototype
console.log(res4.prototype) //undefined