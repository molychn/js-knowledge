// 实现Vue3中的响应式

// 1. 依赖于对“读取”与“设置”操作的拦截
// 2. 在拦截中增加副作用函数与数据建立联系

// eg:
// 一个基本实现就是在“读取”(getter)时将副作用函数放置到对应的 bucket 中,
// 在“设置”(setter)时将副作用函数从 bucket 中取出执行
let activeEffect;
export const effect = (fn) => {
  // 指向副作用函数 fn
  activeEffect = fn;
  // 执行副作用函数
  fn();
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
}
const trigger = (target, key) => {
  // 根据 target 从 bucket 中取 depsMap
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  // 拿出跟 key 相关的所有副作用函数执行
  const effects = depsMap.get(key);
  effects && effects.forEach(fn => fn());
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
