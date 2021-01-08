<template>
  <h2>GrandSon孙组件</h2>
  <hr />
  <p :style="{ color }">颜色</p>
</template>

<script lang="ts">
import { defineComponent, inject, provide, ref } from "vue";

export default defineComponent({
  name: "GrandSon",
  setup() {
    const color = inject("color");
    const title = ref('李明')
    provide('title', title)
    return {
      color,
      title
    };
  },
});
</script>
