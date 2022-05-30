type aStringNumber = string | number;
type aNumber = number;

type MyExclude<T, U> = T extends U ? never : T;

type test1 = Exclude<aStringNumber, aNumber>;
type test2 = MyExclude<aStringNumber, aNumber>;