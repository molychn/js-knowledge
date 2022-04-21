const whatUrTypeIs = require('./whatUrTypeIs')
const deepClone =  (obj, parent = null) => {
  if (obj === null || typeof obj !== 'object') return obj

  let ret = whatUrTypeIs(obj) === 'object' ? {} : []
  // 检测对象循环引用
  let _parent = parent
  while(_parent) {
    // 如果存在父级与当前对象相等，则直接返回currentParent
    if (_parent.originParent === obj) {
      return _parent.currentParent
    }
    _parent = _parent.parent
  }
  for (let x in obj) {
    if (obj.hasOwnProperty(x)) {
      if (obj[x] && typeof obj[x] === 'object') {
        ret[x] = whatUrTypeIs(obj[x]) === 'object' ? {} : []
        ret[x] = deepClone(obj[x], {
          originParent: obj,
          currentParent: ret,
          parent: parent
        })
      } else {
        ret[x] = obj[x]
      }
    }
  }

  return ret
}

module.exports = deepClone