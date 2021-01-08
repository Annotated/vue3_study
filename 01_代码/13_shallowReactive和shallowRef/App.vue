<template>
  <h2>shallowReactive和shallowRef</h2>
  <hr />
  <h3>m1: {{ m1 }}</h3>
  <h3>m2: {{ m2 }}</h3>
  <h3>m3: {{ m3 }}</h3>
  <h3>m4: {{ m4 }}</h3>
  <hr>
  <button @click="updata">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, shallowReactive, shallowRef } from "vue";

export default defineComponent({
  name: "App",
  setup() {

    /**
     * shallowReactive 与 shallowRef
     *   shallowReactive: 只处理了对象内最外层属性的响应式（也就是浅响应式），
     *      (注：更改对象内部的数据后， 在更改对象最外层数据 内层的数据也会在页面更新)
     *   shallowRef: 只处理了value的响应式，不进行对象的reactive的处理
     */
    const m1 = reactive({
      name: '李明',
      age: 20,
      car: {
        name: '奔驰'
      }
    })
    const m2 = shallowReactive({
      name: '李明',
      age: 20,
      car: {
        name: '奔驰'
      }
    })
    const m3 = ref({
      name: '李明',
      age: 20,
      car: {
        name: '奔驰'
      }
    })
    const m4 = shallowRef({
      name: '李明',
      age: 20,
      car: {
        name: '奔驰'
      }
    })
    
    const updata = () => {
      // m1
      // console.log(m1, 'reactive深度响应式') 
      // m1.name += '---'
      // m1.car.name += '----'
      // m2
      // console.log(m2, 'shallowReactive浅响应式')
      // m2.car.name += '----' // 如果更改深层的对象或者数组，随后在修改第一层的属性的值，dom元素也会更改
      // m2.name += '----'
      /**
       * value: Proxy <--- 代理对象
       *   [[Handler]]: Object
       *   [[Target]]: Object
       *   [[IsRevoked]]: false
       */
      console.log(m3, 'ref深响应式')
      // m3.value.name += '-----'
      // m3.value.car.name += '------'
      /**
       * value: Object ←---- 普通对象
       *   age: 20
       *   car: {name: "奔驰"}
       *   name: "李明-----"
       * 
       */
      // console.log (m4, 'shallowRef浅响应式')
      // m4.value.name += '-----'
    }

    return {
      m1,
      m2,
      m3,
      m4,
      updata
    }
  }
});
</script>
