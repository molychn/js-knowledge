import { effect } from "./reactive";

export const watch = (source, cb, options = {}) => {
  let getter;
  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }
  // 定义旧值与新值
  let oldValue, newValue;
  const job = () => {
    // 在调度器中执行副作用函数得到新值
    newValue = effectFn();
    // 将旧值和新值作为回调函数参数
    cb(oldValue, newValue);
    // 更新旧值
    oldValue = newValue;
  }
  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler: job
    }
  )
  if (options.immediate) {
    // 在 Vue 中可以配置 immediate 属性来告诉 watch 第一次创建是否需要立即执行
    job();
  } else {
    // 手动调用副作用函数拿到旧值
    oldValue = effectFn();
  }
}

function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  seen.add(value)
  for (const k in value) {
    traverse(value[k], seen);
  }
  return value;
}