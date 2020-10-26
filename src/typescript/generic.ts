function reverse<T> (items: T[]): T[] {
  const result = []
  for (let i = items.length - 1; i >= 0; i--) {
    result.push(items[i]);
  }
  return result;
}

const sample = [1, 2, 3]
let reversed = reverse(sample)
// reversed[0] = '1' // Error: 不能将类型“string”分配给类型“number”

interface Array<T> {
  reverse (): T[]
}
let numArr = [1, 2];
let reversedNums = numArr.reverse();

// reversedNums = ['1', '2']; // Error: 不能将类型“string”分配给类型“number”