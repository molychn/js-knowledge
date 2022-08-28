// 实现Vue3中的响应式

// 1. 依赖于对“读取”与“设置”操作的拦截
// 2. 在拦截中增加副作用函数与数据建立联系

// eg:
// 一个基本实现就是在“读取”(getter)时将副作用函数放置到对应的 bucket 中,
// 在“设置”(setter)时将副作用函数从 bucket 中取出执行
let activeEffect;
// effect 栈
// 由于同一时刻只能有一个 activeEffect，而当副作用函数发生嵌套时，内部的 effect 会覆盖 activeEffect 的值
// 因此创建一个 effect 栈来管理 effect 的执行
const effectStack = [];

export const effect = (fn) => {
  const effectFn = () => {
    // 每次执行 effectFn 时将相关的依赖清除掉
    cleanDep(effectFn);
    // effectFn 执行时就将该副作用函数赋值给 activeEffect
    activeEffect = effectFn;
    // 每执行一个 effectFn 时就往 effectStack 内压入
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 执行完后就弹出
    effectStack.pop();
    // 改变 activeEffect 的指向
    activeEffect = effectStack[effectStack.length - 1];
  };
  // 创建 deps 数组存放副作用函数相关联的依赖集合
  effectFn.deps = [];
  // 执行副作用函数
  effectFn();
}
const cleanDep = (effectFn) => {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  // 重置数组
  effectFn.deps.length = 0
}

const bucket = new WeakMap();

const track = (target, key) => {
  // 没有 activeEffect 直接 return
  if (!activeEffect) return;
  // 根据 target 从 bucket 中取出对应的 depsMap
  let depsMap = bucket.get(target);
  // 如果不存在 depsMap，则新建一个 Map 并与之关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map())); // 这里相当于创建 Map 的同时给 depsMap 赋值
  }
  // 根据 key 从 depsMap 中取 deps
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set())); // 创建一个 Set 赋值给 deps，同时与 depsMap 建立关联
  }
  // 把当前激活的副作用函数添加到 bucket 中
  deps.add(activeEffect);
  // 副作用函数需要收集依赖，而 deps 就是与副作用相关的依赖集合
  activeEffect.deps.push(deps);
}
const trigger = (target, key) => {
  // 根据 target 从 bucket 中取 depsMap
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  // 拿出跟 key 相关的所有副作用函数执行
  const effects = depsMap.get(key);
  // 由于 cleanDep 清除依赖，副作用执行时又收集依赖，会出现无限循环
  // 所以创建一个副本进行执行
  const effectsToRun = new Set();
  effects && effects.forEach(effectFn => {
    // 增加守卫判断 trigger 触发执行的副作用与当前执行的副作用函数相同，则不执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn);
    }
  })
  effectsToRun.forEach(fn => fn());
}

const reactive = (data) => {
  const obj = new Proxy(data, {
    // getter 拦截
    get (target, key) {
      track(target, key);
      return target[key];
    },
    // setter 拦截
    set (target, key, newVal) {
      // 设置属性值
      target[key] = newVal;
      trigger(target, key);
      return true;
    }
  })

  return obj;
}

export default reactive;
