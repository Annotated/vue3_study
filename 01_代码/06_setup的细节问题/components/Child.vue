<template>
  <h2>Child子级组件</h2>
  <h3>{{ msg }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Child",

  // 接收数据
  props: ["msg"],

  /**
   * setup细节问题：
   * setup是在beforeCreate生命周期回调之前就执行了，而且就执行一次
   * 由此可以推断出：setup在执行的时候，当前的组件还没有创建出来，也就意味着：
   * 组件实例对象this根本就不能用this是undefined，说明，就不能通过this再去
   * 调用data/computed/methods/props中的相关内容了
   * 其实所有的composition API相关回调函数中也都不可用
   *
   * setup中的返回值是一个对象，内部的属性和方法是给html模板使用的
   * setup中的对象内部的属性和data函数中的return对象的属性都可以在html模板中使用
   * setup对象中的属性和data函数中对象的属性会合并为组件对象的属性
   * setup对象中的方法和methods对象中的方法会合并为组件对象的方法
   * 在vue3 中尽量不要混用data和setup methods和setup
   * 一般不要混用使用：methods中可以访问setup中提供的属性和方法，但在setup方法中不能访问data和methods
   * setup不能是一个async函数：因为返回值不再是return的对象，而是promise
   */

  // 数据初始化的声明周期回调
  beforeCreate() {
    console.log("beforeCreate 执行了");
  },

  mounted() {
    console.log(this);
  },

  setup(props, { attrs, slots, emit }) {
    
    /**
     *  props参数，是一个对象，里面有父级组件向子级组件传递的数据，
     *  并且是在子组件中使用props接收到的所有的属性，
     *  包含props配置声明且传入了的所有属性的对象
     */
    console.log (props.msg)

    /**
     * attrs 获取当前组件标签上的所有的属性的对象，但是该属性是在props中没有声明接收的所有的属性的对象
     * emit 分发事件
     * slots 插槽
    */
    console.log (attrs)
    console.log (emit)
    
    console.log("setup执行了", this);

    const showMsg1 = () => {
      console.log("setup中showMsg1的方法");
    };

    return {
      // setup中一般都是返回一个对象，对象中的属相和方法都可以在html模板中直接使用
      showMsg1,
    };
  },

  methods: {
    showMsg2() {
      console.log("methods中showMsg2的方法");
    },
  },
});
</script>
