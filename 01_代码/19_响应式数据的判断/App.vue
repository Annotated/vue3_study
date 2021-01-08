<template>
  <h2>响应式数据的判断</h2>
  <hr />
</template>

<script lang="ts">
import { defineComponent, isProxy, isReactive, isReadonly, isRef, reactive, readonly, ref } from "vue";

export default defineComponent({
  name: "App",

  setup() {
    // isRef 检测一个值是否为一个ref对象
    console.log (isRef(ref('')))
    // isReactive 检测一个对象是否是有 reactive 创建的响应式代理
    console.log (isReactive(reactive({})))
    // isReadonly 检测一个对象是否是具有readonly创建的只读代理
    console.log (isReadonly(readonly({})))
    // isProxy检测一个对象是否是有 reactive 或者 readonly 方法创建的代理
    console.log (isProxy(reactive({})))
  }
});
</script>
