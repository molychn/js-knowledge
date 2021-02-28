// function shellSort(arr) {
//   console.time('shellSort')
//   var len = arr.length,
//       temp,
//       gap = 1;
//   while(gap < len/20) {          //动态定义间隔序列
//       gap =gap*3+1;
//   }
//   for (gap; gap > 0; gap = Math.floor(gap/3)) {
//       for (var i = gap; i < len; i++) {
//           temp = arr[i];
//           for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
//               arr[j+gap] = arr[j];
//           }
//           arr[j+gap] = temp;
//       }
//   }
//   console.timeEnd('shellSort')
//   return arr;
// }

// shellSort([6, 8, 4, 7, 3, 2, 3, 5, 6, 7, 7, 8, 8, 4, 7, 3, 2, 3, 5, 6, 7, 7, 8, 8, 4, 7, 3, 2, 3, 5, 6, 7, 7, 8, 9, 5, 7])
let D = [6, 8, 4, 7, 3, 2, 3, 5, 6, 7, 7, 8, 8, 4, 7, 3, 2, 3, 5, 6, 7, 7, 8, 8, 4, 7, 3, 2, 3, 5, 6, 7, 7, 8, 9, 5, 7]
N = D.length
console.time('shellSort')
let gap = 1
while (gap < N / 3) {
  gap = gap * 3 + 1 // 进行动态定义间隔
}
while (gap > 1) {
  for (let i = gap; i < N; i++) {
    const key = D[i]
    let j
    for (j = i; j >= gap && key < D[j - gap]; j -= gap) {
      D[j] = D[j - gap]
    }
    D[j] = key
  }
  gap /= 3
}
console.timeEnd('shellSort')