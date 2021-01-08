<template>
  <h2>toRef的使用及特点</h2>
  <hr />
  <h3>state: {{ state }}</h3>
  <h3>age: {{ age }}</h3>
  <h3>money: {{ money }}</h3>
  <h3>state2: {{ state2 }}</h3>
  <hr>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, toRefs } from "vue";

export default defineComponent({
  name: "App",

  setup() {

    const state = reactive({
      age: 5,
      money: 100
    })

    // 为响应式对象上的某个属性创建一个ref对象，二者内部操作的是同一个数据值，更新时二者是同步的
    const age = toRef(state, 'age') /**
                                     * ObjectRefImpl {_object: Proxy, _key: "age", __v_isRef: true}
                                     *   __v_isRef: true
                                     *   _key: "age"
                                     *   _object: Proxy {age: 5, money: 106}
                                     *   value: 5
                                     *   __proto__: Object
                                     */

    // ref 拷贝一份新的数据值单独操作，更新时互不影响
    const money = ref(state.money) /**
                                    * RefImpl {_rawValue: 100, _shallow: false, __v_isRef: true, _value: 100}
                                    *   __v_isRef: true
                                    *   _rawValue: 100
                                    *   _shallow: false
                                    *   _value: 100
                                    *   value: 100
                                    *   __proto__: Object
                                    */

    // 为响应式对象转换成普通对象，并且普通对象中的属性是ref类型的，更新时二者是同步的 toRefs 只能传入一个对象
    const state2 = toRefs(state) /**
                                  * {age: ObjectRefImpl, money: ObjectRefImpl}
                                  *   age: ObjectRefImpl
                                  *   __v_isRef: true
                                  *   _key: "age"
                                  *   _object: Proxy {age: 5, money: 102}
                                  *   value: (...)
                                  *   __proto__: Object
                                  *   money: ObjectRefImpl {_object: Proxy, _key: "money", __v_isRef: true}
                                  *   __proto__: Object
                                  */

    const update = () => {
      // state.age += 1
      // age.value += 1
      // state2.age.value += 1

      state.money += 1

      console.log (age, money, state2)

      // money.value += 1
    }

    return {
      state,
      age,
      money,
      state2,
      update
    }
  }
});
</script>
