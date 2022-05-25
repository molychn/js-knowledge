type arr11 = ['a', 'b', 'c']
type arr22 = [3, 2, 1]

// 第一个版本里我只对泛型作了数组类型的校验，然后来获取数组第一个元素
// 但是在数组为空的情况下获取到的类型为undefined，感觉失去了类型追踪的概念
// type First<T extends readonly any[]> = T[0]
// 参考社区的做法应该是再对数组内的元素进行校验
// 用infer推断数组第一个元素，存在的话返回first，不存在则返回never
type First<T extends readonly any[]> = T extends [infer first, ...infer reset] ? first : never

type head1 = First<arr11>