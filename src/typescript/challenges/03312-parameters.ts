type T0 = Parameters<() => string>

type func = (...args: any) => any
type myParam<T extends func> = T extends (...args: infer U) => any ? U : never

type T1 = myParam<(s: string) => void>;
type T2 = Parameters<<T>(arg: T) => T>;