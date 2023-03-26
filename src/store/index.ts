import { createStore } from "vuex";
import type Entry from "@/types/Entry";

export const store = createStore({
  state: {
    todos: [],
  },
  mutations: {
    ADD_TODO(state, payload: Entry) {
      state.todos.unshift(payload);
    },
  },
  actions: {
    addTodo(context, entry) {
      context.commit("ADD_TODO", entry);
    },
  },
  getters: {
    todos(state) {
      return state.todos.filter((todo) => !todo.isChecked);
    },
    checkedTodos(state) {
      return state.todos.filter((todo) => todo.isChecked);
    },
  },
  modules: {},
});
