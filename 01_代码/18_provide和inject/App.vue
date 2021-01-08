<template>
  <h2>provide和inject</h2>
  <hr />
  <p>当前得颜色: {{ color }}</p>
  <button @click="color = 'red'">红色</button>
  <button @click="color = 'yellow'">黄色</button>
  <button @click="color = 'green'">绿色</button>
  <hr>
  <Son />
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";

import Son from './components/Son.vue'
export default defineComponent({
  name: "App",
  components: {
    Son
  },
  setup() {
    const color = ref('red')
    provide('color', color)
    // const title = inject('title')
    return {
      color,
      // title
    }
  }
});
</script>
