const lengthOfLongestSubstring = function(s) {
  // 切分数组
  let arrs = s.split('')
  if (arrs.length <= 1) return arrs.length
  let max = 1
  let temp = [arrs[0]]
  for (let i = 1; i < arrs.length; i++) {
    console.log(temp, i)
    let index = temp.indexOf(arrs[i])
    if (index != -1) {
      console.log(`当前重复的位置为${index},${arrs[i]}`)
      max = Math.max(index + 1, max, temp.length - index - 1)
      console.log('max: ', max)
      temp = temp.slice(index + 1, temp.length)
      temp.push(arrs[i])
      console.log('temp: ', temp)
    } else {
      temp.push(arrs[i])
      max = Math.max(max, temp.length)
    }
  }
  return max
};

console.log(lengthOfLongestSubstring("abcabcbb"))