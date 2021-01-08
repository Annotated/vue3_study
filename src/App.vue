<template>
  <div class="todo-comtainer">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :CheckAll="CheckAll"
        :clearAllCompletedTodos="clearAllCompletedTodos"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, reactive, toRefs, watch } from "vue";
import { saveTodos, readTodos } from "./utils/localStorageUtils";
import { Todo } from "./types/todo";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import List from "./components/List.vue";
export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    List,
  },

  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: [
      ],
    });

    // 添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };

    // 删除数据的方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };

    // 修改todo的isCompleted属性的状态
    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
      console.log(isCompleted);
    };

    // 全选或者全不选的方法
    const CheckAll = (isCompleted: boolean) => {
      state.todos.forEach((res) => {
        res.isCompleted = isCompleted;
      });
    };

    // 清楚所有选中的数据
    const clearAllCompletedTodos = () => {
      state.todos = state.todos.filter((f) => !f.isCompleted);
    };

    provide("deleteTodo", deleteTodo);

    // 监听操作：如果todos数组的数据发生变化了，直接存储到浏览器的缓存中
    watch(() => state.todos, saveTodos, { deep: true });

    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos()
      }, 1000)
    })

    return {
      ...toRefs(state),
      addTodo,
      updateTodo,
      CheckAll,
      clearAllCompletedTodos,
    };
  },
});
</script>
<style scoped>
.todo-comtainer {
  width: 600px;
  margin: 0 auto;
}
.todo-comtainer .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
