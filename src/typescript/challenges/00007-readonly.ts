interface Cat {
  name: string;
  age: number;
}
// TS里内置的Readonly
let cat: Readonly<Cat> = {
  name: 'tota',
  age: 2
}
// cat.name = 'king' // error：无法分配到 "name" ，因为它是只读属性。ts(2540)


type MyReadonly<T> = {
  // 先是keyof遍历T中的属性，然后in遍历过程中加上readonly
  readonly [p in keyof T]: T[p]
}