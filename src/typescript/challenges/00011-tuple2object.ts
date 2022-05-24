// 这里tuple变量使用as const断言
// const断言告诉编译器为表达式推断出它能推断出的最窄或最特定的类型
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

// 由于使用了const断言，a获取到的类型type a = readonly ["tesla", "model 3", "model X", "model Y"]
// 相当于把整个变量对象直接转化为一个类型结果
// 如果没有使用const断言，则typeof会去遍历元素，从而得到type a = string[]
type a = typeof tuple

// type b = "tesla" | "model 3" | "model X" | "model Y"
// 用a[number]遍历得到一个字面量联合类型
type b = a[number]

type TupleToObject<T extends readonly any[]> = {
    // 相当于"model 3": "model 3"
    [p in T[number]]: p
}


type ret = TupleToObject<typeof tuple>