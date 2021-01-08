<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName" />
    名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名：<input type="text" placeholder="请输入姓氏" v-model="fullName1" /> 姓名：<input
      type="text"
      placeholder="请输入姓氏"
      v-model="fullName2"
    />
    姓名：<input type="text" placeholder="请输入姓氏" v-model="fullName3" />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, ref, watchEffect } from "vue";

export default defineComponent({
  name: "App",

  setup() {
    // 定义一个响应式的对象
    const user = reactive({
      firstName: "东方",
      lastName: "不败",
    });

    // 通过计算属性的方式，实现第一个姓名的显示
    // vue3中的计算属性的函数中如果只传入一个回调函数，表示的是get
    // 返回的是一个Ref类型的对象
    const fullName1 = computed(() => {
      return user.firstName + "_" + user.lastName;
    });

    // console.log (fullName1)

    const fullName2 = computed({
      get: () => {
        return user.firstName + "_" + user.lastName;
      },
      set: (v: string) => {
        const names = v.split("_");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });

    const fullName3 = ref("");
    // 监视 --- 监视指定的数据
    watch(
      user,
      ({ firstName, lastName }) => {
        fullName3.value = firstName + "_" + lastName;
      },
      { immediate: true, deep: true }
    );
    // immediate 默认会执行一次watch，deep 深度监视

    // 不需要配置immediate，本身默认就会进行监视（默认执行一次）
    // watchEffect(() => {
    //   fullName3.value = user.firstName + "_" + user.lastName;
    // })

    // 监视fullName3的数据，改变firstName和lastName
    watchEffect(() => {
      console.log (fullName3.value)
      const names = fullName3.value.split("_");
      user.firstName = names[0];
      user.lastName = names[1]; 
    })

    // watch --- 监听多个数据
    // watch 一般监听的是响应式的数据 如果有非响应式的数据 应该以 () => 开头
    watch([user.lastName, fullName3], () => {
      console.log ('====')
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    };
  },
});
</script>
