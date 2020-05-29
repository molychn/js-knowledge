const bubbleSort = (randArray) => {
  console.time('bubbleSort')
  // 参数类型判断
  if (!(randArray instanceof Array)) {
    return false
  }
  if (randArray.length <= 1) {
    return randArray
  }
  let n = randArray.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (randArray[j] > randArray[j + 1]) {
        let temp = randArray[j + 1]
        randArray[j + 1] = randArray[j]
        randArray[j] = temp
      }
    }
  }
  console.timeEnd('bubbleSort')
  return randArray
}
let result = bubbleSort([5, 34, 5, 45, 34, 65, 8, 34, 22, 55, 7, 233, 567])
console.log(result)
module.exports = bubbleSort