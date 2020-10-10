function removeDuplicates(nums) {
  if (nums.length == 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
      if (nums[j] != nums[i]) {
          i++;
          nums[i] = nums[j];
      }
  }
  return i + 1;
}

removeDuplicates([0, 0, 0, 1, 1, 3, 4, 5, 6, 6, 6, 7, 8, 9, 11, 11, 34, 45])