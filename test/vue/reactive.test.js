import assert from 'power-assert';
import reactive, { effect } from '../../src/vue/reactive';

describe('The reactive test', () => {
  context('测试是否初步实现简单的数据响应', () => {
    it('改变对象某个属性的值触发拦截', () => {
      let obj = reactive({
        foo: 1,
        bar: 2
      })
      effect(() => {
        console.log(obj.foo);
      })
      obj.foo++;
      assert(obj.foo === 2);
    })
  })
})