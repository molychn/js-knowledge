/**
 *
 *
 * @param {Array} literals 以替换位位切割位置所切割出来的字符串数组
 * @param {*} substitutions 替换位的值，以剩余参数形式传入函数
 * @returns
 */
function passthru (literals, ...substitutions) {
  console.log(literals, ...substitutions)
  let result = ''

  // 使用substitutions的元素数量进行循环,避免数组越界
  for (let i = 0; i < substitutions.length; i++) {
    result += literals[i]
    result += substitutions[i]
  }

  result += literals[literals.length - 1]

  return result
}

let count = 10,
    price = 0.25
    message = passthru`Hello world ${count} items cost $${(count * price).toFixed(2)}.`

console.log(message)