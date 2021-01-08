<template>
  <h2>reactive和ref的细节问题</h2>
  <h3>m1: {{ m1 }}</h3>
  <h3>m2: {{ m2 }}</h3>
  <h3>m3: {{ m3 }}</h3>
  <hr />
  <button @click="updataData">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "App",

  /**
   * 是Vue3的 composition Api 中2个重要的响应式 Api (ref 和 reactive)
   * ref用来处理基本数据类型数据，reactive用来处理对象（递归深度响应式）
   * 如果用ref处理对象/数组,内部会自动将对象/数组转换reactive的代理对象
   * ref内部：通过给value属性添加getter/setter来实现对数据的劫持
   * reactive内部：通过使用Proxy来实现对对象内部所有的数据的劫持，并通过Reflect操作对象内部数据
   * ref的数据操作：在js中要.value，在模板中不需要（内部解析模板时会自动添加.value）
   */
  setup() {
    // 通过ref的方式设置的数据
    const m1 = ref("abc");

    const m2 = reactive({
      name: "李明",
      wife: {
        name: "小红",
      },
    });

    const m3 = ref({
      name: "李明",
      wife: {
        name: "小红",
      },
    });

    const updataData = () => {
      // ref中如果放入的是一个对象，那么是经过了reactive的处理，形成一个Proxy类型的对象
      console.log(m3);
      console.log(m3.value.wife);
      m1.value += "===";
      m2.wife.name += "====";
      m3.value.name += "====";
    };

    return {
      m1,
      m2,
      m3,
      updataData,
    };
  },
});
</script>
