import reactive, { effect, tracker, trigger } from "./reactive";
const computed = (getter) => {
  let value; // 用于缓存上一次计算的值
  let dirty = true; // 用于判断脏不脏从而重新计算

  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
    // 配置调度器，在响应式数据发生变化时调用调度器重置 dirty
    scheduler () {
      if (!dirty) {
        dirty = true;
        // 当计算属性依赖的响应式数据发生变化时，手动调用 trigger 函数触发响应
        trigger(obj, 'value');
      }
    }
  });

  const obj = {
    get value () {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      // 读取 value 时调用 tracker 进行追踪
      tracker(obj, 'value');
      return value;
    }
  }

  return obj;
}

export default computed;
