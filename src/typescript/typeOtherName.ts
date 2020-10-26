type FunctionType<T extends object, U extends object> = (first: T, second: U) => T & U

let extend:FunctionType(first, second)