<template>
  <h2>toRaw和markRaw</h2>
  <hr />
  <h3>state: {{ state }}</h3>
  <hr>
  <button @click="testToRaw">执行toRaw</button>
  <button @click="testMarkRaw">执行markRaw</button>
</template>

<script lang="ts">
import { defineComponent, markRaw, reactive, toRaw } from "vue";

interface UserInfo {
  name: string;
  age: number;
  likes?: string[];
}

export default defineComponent({
  name: "App",

  setup() {

    const state = reactive<UserInfo>({
      name: '李明',
      age: 20
    })

    const testToRaw = () => {
      // 把由reactive 或 readonly 方法代理对象变成普通对象，数据变化，界面不变化
      const user = toRaw(state)
      user.name += '==='
      console.log (user) /**
                          * {name: "李明==================", age: 20}
                          *   age: 20
                          *   name: "李明=================="
                          *   __proto__: Object
                          */
    }

    const testMarkRaw = () => {
      const likes = [ '吃', '喝' ]
      // markRaw 标记的对象数据，从此以后都不能在成为代理对象
      // 使用 markRaw 标记的对象数据，会添加一个 __v_skip: true 的属性
      state.likes = markRaw(likes)
      setInterval(() => {
        if (state.likes) {
          state.likes[0] += '-----'
          console.log(state) /**
                              * Proxy {name: "李明", age: 20, likes: Array(2)}
                              *   [[Handler]]: Object
                              *   [[Target]]: Object
                              *   age: 20
                              *   likes: (2) ["吃------", "喝", __v_skip: true]
                              *   name: "李明"
                              *   __proto__: Object
                               */
        }
      }, 1000)
    }

    return {
      state,
      testToRaw,
      testMarkRaw
    }
  },
});
</script>
