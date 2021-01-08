<template>
  <h2>App父级组件：Suspense组件的使用(不确定的)</h2>
  <hr />

  <Suspense>
    <template #default>
      <!-- 只能有一个异步组件 [Vue warn]: <Suspense> slots expect a single root node. 
      at <App> -->
      <!-- <AsyncComponent /> -->
      <AsyncAddress />
    </template>
    <template v-slot:fallback>
      Loading.....
    </template>
  </Suspense>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
// 引入组件：静态引入和动态引入

// vue2的动态引入组件的方式（vue3中不可使用）
// const AsyncComponent = () => import('./components/AsyncComponent.vue')
// Vue3中的动态引入组件的写法
// const AsyncComponent = defineAsyncComponent(
//   () => import('./components/AsyncComponent.vue'))

// 静态引入组件
// import AsyncComponent from './components/AsyncComponent.vue'
import AsyncAddress from './components/AsyncAddress.vue'
export default defineComponent({
  name: "App",
  components: {
    // AsyncComponent,
    AsyncAddress
  }
});
</script>
