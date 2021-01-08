<template>
  <h2>customRef的使用</h2>
  <hr />
  <input type="text" v-model="keyword" />
  <p>{{ keyword }}</p>
</template>

<script lang="ts">
import { customRef, defineComponent } from "vue";

// 自定义hook防抖函数
function useDebouncedRef<T>(value: T, delay = 200) {
  let timeOutId: number
  return customRef((track, trigger) => {
    return {
      // 返回数据
      get() {
        // 告诉vue 追踪数据
        track();
        return value;
      },
      // 设置数据
      set(newValue: T) {
        clearTimeout(timeOutId)
        // 开始定时器
        timeOutId = setTimeout(() => {
          value = newValue
          // 告诉vue更新页面
          trigger()
        }, delay)
      },
    };
  });
}

export default defineComponent({
  name: "App",

  setup() {
    const keyword = useDebouncedRef("abc", 300);
    return {
      keyword,
    };
  },
});
</script>
