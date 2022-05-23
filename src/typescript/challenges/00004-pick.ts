// K extends keyof T，表示K的值需要是keyof T中所拥有的
// keyof能获取到T中的属性，如下列Todo中能得到title，description，completed
type MyPick<T, K extends keyof T> = {
  // 用in遍历K，然后给每个属性赋上类型
	[key in K]: T[key]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}