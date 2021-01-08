<template>
  <div class="todo-footer">
    <label for="">
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span
      ><span>已完成{{ num }}</span
      >/ 全部 {{ todos.length }}</span
    >
    <button class="btn btn-danger" @click="clearAllCompletedTodos">消除已完成的任务</button>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/types/todo";
import { computed, defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "Footer",
  props: {
    todos: {
      type: Object as () => Todo[],
      required: true,
    },
    CheckAll: {
        type: Function,
        required: true
    },
    clearAllCompletedTodos: {
        type: Function,
        required: true
    }
  },
  setup(props) {
    const num = ref(0);

    // 全选/全不选的就算属性
    const isCheckAll = computed({

        get(): boolean {
            return num.value > 0 && props.todos.length === num.value
        },

        set(v: boolean) {
            props.CheckAll(v)
        }
    })

    watchEffect(() => {
      num.value = 0;
      props.todos.forEach((res) => {
        if (res.isCompleted) num.value++;
      });
    });
    return {
      num,
      isCheckAll
    };
  },
});
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
