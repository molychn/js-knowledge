type Push<T extends readonly any[], U> = [...T, U]

type ret3057 = Push<[1, 2, 3], 4>