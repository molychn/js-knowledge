/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  let hasNums: object = {}
  for (let i = 0; i < nums.length; i++) {
    hasNums[nums[i]] = i
  }
  for (let j = 0; j < nums.length; j++) {
    let t = target - nums[j]
    if (hasNums[t] && hasNums[t] !== j) {
      return [j, hasNums[t]]
    }
  }
};
// @lc code=end

