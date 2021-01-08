<template>
  <button @click="modalOpen = true">打开弹框</button>

  <!-- <div v-if="modalOpen">
    <div>
        这是一个弹框
    </div>
    <button @click="modalOpen = false">关闭弹框</button>
  </div> -->
  <!-- teleport 可以让组件的html在父组件界面外的特定标签下插入显示 -->
  <teleport to="body">
    <div v-if="modalOpen">
      <div>这是一个弹框</div>
      <button @click="modalOpen = false">关闭弹框</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ModalButton",
  setup() {
    const modalOpen = ref(false);

    return {
      modalOpen,
    };
  },
});
</script>
