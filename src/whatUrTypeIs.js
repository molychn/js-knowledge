const toString = Object.prototype.toString

const type = (x, strict = false) => {
  strict == !!strict

  // 修改typeof null为object的结果
  if (x === null) return 'null'

  const t = typeof x

  // typeof的结果为number，区分不出number和NaN
  if (t === 'number' && isNaN(x)) {
    return 'NaN'
  }

  // 对于不是object的直接返回去typeof值
  // number string boolean undefined symbol String() Boolean() ...
  if (t !== 'object') return t

  let typeName = ''
  try {
    typeName = toString.call(x).slice(8, -1).toLowerCase()
  } catch (e) {
    return 'object'
  }

  // 检测new实例化，如new Array()应为数组，new String()为字符串等
  if (typeName !== 'object') {
    if (typeName === 'number' && isNaN(x)) return 'NaN'
    return typeName
  }

  if (x.constructor === Object) return typeName

  // Object.create(null)创建不继承Object原型链上属性的对象
  if (Object.getPrototypeOf(x) === null || x.__proto__ === null) return 'object'

  return 'unknown'
}

module.exports = type