type MyExclude00003<T, U> = T extends U ? never : T;
type MyPick00003<T, K extends keyof T> = {
  [key in K]: T[key]
}

type MyOmit00003<T, K extends keyof T> = MyPick00003<T, MyExclude00003<keyof T, K>>

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview00003 = MyOmit00003<Todo, 'description' | 'title'>

const todo00003: TodoPreview00003 = {
  completed: false,
}

// 主要考虑到先对U中存在于T的属性进行过滤，即exclude处理
// 得到U不存在的属性后将其与T做一个选择pick即可得到omit的结果