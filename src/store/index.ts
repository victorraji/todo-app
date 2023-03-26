import { createStore } from "vuex";
import type Entry from "@/types/Entry";

export type State = { todos: Entry[] };

const state: State = { todos: [] };

export const store = createStore({
  state,
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
