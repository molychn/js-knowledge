// 根据题意的意思应该是需要获取Promise中的类型，所以可以尝试使用类型推到infer来获取Promise内的类型
// 使用递归用于返回Promise嵌套
type myAwaited<T extends Promise<any>> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? myAwaited<U>
    : U
  : never

type a189 = myAwaited<Promise<Promise<number>>> // type a189 = number
type b189 = Promise<string>