<template>
  <h2>AsyncAddress组件</h2>
  <hr />
  <h3>{{ data }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";
export default defineComponent({
  name: "AsyncAddress",
  //   setup() {
  //     return axios.get('/data/address.json').then(res => {
  //         return {
  //             data: res.data
  //         }
  //     })
  //   }

  async setup() {
    return await axios.get("/data/address.json")
  },
});
</script>
