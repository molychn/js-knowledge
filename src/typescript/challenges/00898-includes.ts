// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false
// // 使用上面的实现无法校验出true和boolean
// type testBool = Includes<[boolean], true>

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1: 2) ? true : false

type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Rest]
  ? Equal<U, First> extends true
    ? true
    : Includes<Rest, U>
  : false

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Santana'> // expected to be `false`
type testBool = Includes<[boolean], true>