<template>
  <h2>自定义hook函数操作</h2>
  <h2>x: {{ x }}, y: {{ y }}</h2>
  <h3 v-if="loading">正在加载。。。。。</h3>
  <h3 v-else-if="errorMsg">错误信息:{{ errorMsg }}</h3>
  <ul v-else>
    <li>id:{{ data.id }}</li>
    <li>address: {{ data.address }}</li>
    <li>name: {{ data.name }}</li>
  </ul>
  <hr />
  <ul v-for="item in data" :key="item.id">
    <li>id:{{ item.id }}</li>
    <li>age: {{ item.age }}</li>
    <li>name: {{ item.name }}</li>
  </ul>
</template>

<script lang="ts">
import useMousePosition from "./hooks/useMousePosition";
import useRequest from "./hooks/useRequest";

import { defineComponent, watch } from "vue";

interface Products {
  id: string;
  name: string;
  age: number;
}

export default defineComponent({
  name: "App",

  setup() {
    const { x, y } = useMousePosition();
    // 获取对象数据
    // const { data, loading, errorMsg } = useRequest('/data/address.json');
    // 获取数组数据
    const { data, loading, errorMsg } = useRequest<Products[]>("/data/products.json");

    watch(data, () => {
      console.log(data.value?.length);
    });

    return {
      x,
      y,
      data,
      loading,
      errorMsg,
    };
  },
});
</script>
