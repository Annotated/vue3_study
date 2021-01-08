<template>
  <h2>子级组件</h2>
  <button @click="updataMsg">更新数据</button>
  <hr />
  <h3>{{ msg }}</h3>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";

export default defineComponent({
  name: "Child",
  // vue2.x中的生命周期钩子
  beforeCreate() {
    console.log("2.x中的beforeCreate");
  },
  created() {
    console.log("2.x中的created");
  },
  beforeMount() {
    console.log("2.x中的beforeMount");
  },
  mounted() {
    console.log("2.x中的mounted");
  },
  beforeUpdate() {
    console.log("2.x中的beforeUpdate");
  },
  updated() {
    console.log("2.x中的updated");
  },
  // vue2.x中的beforeDestory和destroyed这两个生命周期回调已经在Vue3中改名，不能再使用
  beforeUnmount() {
    console.log("2.x中的beforeUnmount");
  },
  unmounted() {
    console.log("2.x中的unmounted");
  },

  setup() {
    const msg = ref("abc");
    const updataMsg = () => {
      msg.value += "===";
    };

    // vue3.x中生命周期的组合式 API
    onBeforeMount(() => {
      console.log("3.x中的onBeforeMount");
    });

    onMounted(() => {
      console.log("3.x中的onMounted");
    });

    onBeforeUpdate(() => {
        console.log("3.x中的onBeforeUpdate");
    });

    onUpdated(() => {
        console.log("3.x中的onUpdated");
    });

    onBeforeUnmount(() => {
        console.log("3.x中的onBeforeUnmount");
    });

    onUnmounted(() => {
        console.log("3.x中的onUnmounted");
    });

    return {
      msg,
      updataMsg,
    };
  },
});
</script>
