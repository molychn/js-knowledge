// type Concat<T extends readonly any[], U extends readonly any[]> = T extends any[infer resetT]
//   ? U extends any[infer resetU]
//     ? [...T, ...U]
//     : [T]
//   : never

type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]

type ret533 = Concat<[1, 3], [2]>