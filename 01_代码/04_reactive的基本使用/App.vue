<template>
  <h2>reactive的使用</h2>
  <h3>姓名：{{ user.name }}</h3>
  <h3>年龄：{{ user.age }}</h3>
  <h3>媳妇：{{ user.wife }}</h3>
  <br>
  <button @click="updataUser">更新数据</button>
</template>

<!-- script 中可以使用ts的代码 -->
<script lang="ts">

// defineComponent 函数，目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent, reactive } from 'vue';

// 暴露出去一个定义好的组件
export default defineComponent({
  // 组件名称
  name: 'App',
  
  // 需求：显示用户的相关信息，点击按钮，可以更新用户的相关信息数据
  /**
   * reactive
   * 作用： 定义多个数据的响应式
   * const proxy = reactive(obj): 接收一个普通对象然后返回普通对象的响应式代理对象
   * 响应式转换时“深层的”：会影响对象内部所有嵌套的属性
   * 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据,都是响应式的
   */

  setup () {
    const obj = {
      name: '小明',
      age: 20,
      wife: {
        name: '小甜甜',
        age:18,
        cars: ['奔驰', '宝马', '奥迪']
      }
    }

    // 把数据变成响应式数据
    // 返回的是一个Proxy的代理对象，被代理的目标对象就是obj对象
    // user 现在是代理对象， obj 是目标对象
    // user 对象的类型是 Proxy
    const user = reactive<any>(obj)

    console.log (user)

    const updataUser = () => {
      user.name += '=='
      user.wife.name += '--'
      user.wife.cars[0] = '保时捷'
      console.log (obj)

      // user ---> 代理对象， obj ---> 目标对象
      // user 对象或者 obj 对象添加一个新的属性，哪一种方式会影响界面的更新
      // user.gender = '男' // 界面可以更新渲染， 目标对象也会更改
      // obj.gender = '男' // 界面不会更新数据，目标对象的值会更改
      // user 对象或者 obj 对象中移除一个已存在的属性，哪一种方式会影响界面的更新
      // delete obj.age // 界面没有更新渲染， obj中确实没有了age这个属性
      // delete user.age // 界面更新渲染，obj中确实没有了age这个属性

      // 总结：如果操作代理对象，目标对象中的数据也会随之变化，同时界面也会重新更新渲染
    }

    return {
      user,
      updataUser
    }
  }
});
</script>

