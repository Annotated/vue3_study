<template>
  <h2>toRefs函数</h2>
  <hr />
  <h3>name:{{ name }}</h3>
  <h3>age: {{ age }}</h3>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "App",

  setup() {
    const state = reactive({
      name: '李明',
      age: 40
    })

    // toRefs 可以把一个响应式对象转换成一个普通对象，该普通对象里的每个属性都是一个 ref 的响应式数据
    // const state2 = toRefs(state)

    // console.log (state2)

    setInterval(() => {
      state.name += '---'
      // state2.name.value += '-----'
    }, 1000)

    return {
      // ...state // 不再是响应式的数据 ---> 解构后 { name: '李明，age: 47' }
      // ...state2
      ...toRefs(state)
    }
  }
});
</script>
