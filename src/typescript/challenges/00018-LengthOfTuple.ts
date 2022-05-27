type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT', 'length', 'test']

// 利用对象具有的length属性，泛型T必须具备该属性
type Length<T extends {'length': number}> = T['length']
// extend数组的情况下数组具备length属性
type Length1<T extends readonly any[]> = T['length']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5