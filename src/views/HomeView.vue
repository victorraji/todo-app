<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "@/components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import { useStore } from "vuex";
import { reactive, ref, provide, computed } from "vue";
import type User from "@/types/User";
import type Entry from "@/types/Entry";
import { userInjectionKey } from "@/Injectionkeys";
let showCheckedTodos = ref(false);
const store = useStore();
const user: User = reactive({
  name: "Victor Raji",
  id: 1,
  settings: [],
});
provide(userInjectionKey, user);
const todos: Entry[] = reactive([]);
function handleCreate(entry: Entry) {
  todos.unshift(entry);
}
const allTodos = computed<Entry[]>(() => {
  return store.getters.todos;
});
const checkedTodos = computed<Entry[]>(() => {
  return store.getters.checkedTodos;
});
const isViewAllTodos = computed(() => {
  return showCheckedTodos.value && checkedTodos.value.length > 4;
});
function collapseCheckedTodos() {
  showCheckedTodos.value = !showCheckedTodos.value;
}
</script>

<template>
  <div class="flex justify-center bg-black">
    <main class="container m-auto relative">
      <TheHeader />
      <transition name="switch" mode="in-out">
        <div
          v-if="checkedTodos.length"
          class="text-gray-300 cursor-pointer border-t border-b border-gray-300 p-2"
        >
          <div @click="collapseCheckedTodos" class="flex items-center">
            <div class="p-2 pr-3">{{ ">" }}</div>
            <span class="">{{ checkedTodos.length }} Done</span>
          </div>
          <div v-if="showCheckedTodos" class="checked-todos">
            <transition-group tag="ul" name="list" appear>
              <li v-for="todo in checkedTodos" :key="todo.id">
                <EntryCard :todo="todo" />
              </li>
            </transition-group>
          </div>
        </div>
      </transition>

      <transition name="switch" mode="out-in">
        <div
          :class="isViewAllTodos ? 'checked-todos' : 'only-todos'"
          v-if="allTodos.length"
        >
          <transition-group tag="ul" name="list" appear>
            <li v-for="todo in allTodos" :key="todo.id">
              <EntryCard :todo="todo" />
            </li>
          </transition-group>
        </div>

        <div v-else class="m-5">Nothing Todo currently, Add a new Todo</div>
      </transition>
      <div class="fixed bottom-16">
        <EntryEditor @@create="handleCreate" />
      </div>
    </main>
  </div>
</template>

<style>
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-enter-active {
  transition: all 0.5s ease;
}
.list-leave-active {
  transition: all 0.5s ease;
}
.list-move {
  transition: all 0.5s ease;
}

.switch-leave-to,
.switch-enter-from {
  opacity: 0;
  transform: translate(20px);
}

.switch-leave-active,
.switch-enter-active {
  transition: all 0.2s ease;
}
</style>
