<template>
  <h2>AsyncComponent子集组件</h2>
  <hr />
  <h3>{{ msg }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AsyncComponent",
  setup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          msg: '异步操作'
        })
      }, 500)
    })
  }
});
</script>
