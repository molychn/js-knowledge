function cloneLoop (x) {
  const root = {}

  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof res !== 'undefined') {
      res = parent[key] = {}
    }
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}

function cloneForce (x) {
  const uniqueList = []
  let root = {}

  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const parent = node.parent
    const key = node.key
    const data = node.data

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof res !== 'undefined') {
      res = parent[key] = {}
    }
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
        parent[key] = uniqueData.target;
        continue; // 中断本次循环
    }
    // 数据不存在
    uniqueList.push({
      source: data,
      target: res
    })
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}
function find(arr, item) {
  for(let i = 0; i < arr.length; i++) {
      if (arr[i].source === item) {
          return arr[i]
      }
  }
  return null
}