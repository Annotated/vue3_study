<template>
  <h2>App父级组件</h2>
  <hr />
  <h3>msg: {{ msg }}</h3>
  <button @click="msg += '='">更新数据</button>
  <Child :msg='msg'/>
</template>

<script lang="ts">
// 引入组件
import Child from "./components/Child.vue";

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",

  // 注册组件
  components: {
    Child,
  },

  setup () {
    const msg = ref('测试数据')
    return {
      msg
    }
  }
});
</script>
