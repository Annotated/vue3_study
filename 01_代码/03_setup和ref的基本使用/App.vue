<template>
  <h2>setup和ref的基本使用</h2>
  <h3>{{ count }}</h3>
  <button @click="updataCount">更新数据</button>
</template>

<!-- script 中可以使用ts的代码 -->
<script lang="ts">

// defineComponent 函数，目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent, ref } from 'vue';

// 暴露出去一个定义好的组件
export default defineComponent({
  // 组件名称
  name: 'App',
  // 需求: 页面打开后可以直接看到一个数据，点击按钮后，该数据可以发生变化
  // vue2 的实现方式
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   updataCount () {
  //     this.count ++
  //   }
  // },
  // vue3 的实现方式
  // setup 是组合API的入口函数，只执行一次
  setup() {
    // 变量
    // let count = 0 // 此时的数据并不是响应式的数据（响应式数据：数据变化，页面跟着渲染变化）
    // ref是一个函数，作用：定义一个响应式的数据，返回的是一个Ref对象，对象中有一个value属性
    // 如果需要对数据进行操作，需要使用ref对象调用value属性对数据进行操作
    // html模板中不需要使用.value属性的写法
    // ref 一般用来定义一个 基本类型 的响应式数据
    const count = ref(0)
    
    // 报错原因 count是一个Ref对象
    console.log (count)

    // 方法
    const updataCount = () => count.value ++

    return {
      count,
      updataCount
    }
  }
 
});
</script>

