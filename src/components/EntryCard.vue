<script setup lang="ts">
import DateDisplay from "./DateDisplay.vue";
import type Entry from "@/types/Entry";
import { inject, toRefs } from "vue";
import { userInjectionKey } from "@/Injectionkeys";
const user = inject(userInjectionKey);
const props = defineProps<{ todo: Entry }>();

const { todo } = toRefs(props);
</script>

<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <input
        v-model="todo.isChecked"
        type="checkbox"
        class="checkbox-round mr-1.5"
      />
      <div>
        <div class="entry-text -mb-1">{{ todo.body }}</div>
        <div class="entry-footer">
          <DateDisplay :date="todo.createdAt" class="mr-2" />
          <span class="ml-2 text-9px justify-end">{{ user?.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
