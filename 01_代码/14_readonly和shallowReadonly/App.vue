<template>
  <h2>readonly和shallowReadonly</h2>
  <hr />
  <h3>state: {{ state3 }}</h3>
  <button @click="updata">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from "vue";

export default defineComponent({
  name: "App",
  
  setup() {
    const state = reactive({
      name: '佐助',
      age: 20,
      car: {
        name: '奔驰',
        color: 'red'
      }
    })

    // 只读数据 --- 深度只读
    // const state2 = readonly(state) -------
    //                                       |
    // 只读数据 --- 浅只读                    ↓
    const state3 = shallowReadonly(state) // 如果把一个对象转为深度只读，再把对象转为浅只读，那么这个对象依旧是深只读

    const updata = () => {
      // state.name += '----'
      // state2.name += '---' // Cannot assign to 'name' because it is a read-only property.
      // state2.car.name += '---' // Cannot assign to 'name' because it is a read-only property.
      // console.log (state2)
      // state3.name += '---' // Cannot assign to 'name' because it is a read-only property.
      state3.car.name += '---'
      console.log (state3)
    }

    return {
      // state,
      // state2,
      state3,
      updata
    }
  }
});
</script>
