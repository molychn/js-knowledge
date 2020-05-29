const bubbleSort = (randArray) => {
  console.time('bubbleSort')
  // 参数类型判断
  console.log(!(randArray instanceof Array))
  if (!(randArray instanceof Array)) {
    return false
  }
  if (randArray.length <= 1) {
    return randArray
  }
  for (let i = 0; i < randArray.length; i++) {
    
  }
  console.timeEnd('bubbleSort')
}
console.log(bubbleSort(true))
module.exports = bubbleSort