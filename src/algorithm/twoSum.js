/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let hashNums = {}
  for (let i = 0; i < nums.length; i++) {
    hashNums[nums[i]] = i
  }
  console.log(hashNums)
  for (let j = 0; j < nums.length; j++) {
    let t = target - nums[j]
    console.log('t: ', t)
    if (hashNums[t] && hashNums[t] != j) {
      console.log(j, hashNums[t])
      return [j, hashNums[t]]
    }
  }
};

let nums = [1, 5, 4, 5, 6]
let target = 10

console.log(twoSum(nums, target))