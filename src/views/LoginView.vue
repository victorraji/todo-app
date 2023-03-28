<script setup lang="ts">
import { reactive } from "vue";
import type User from "@/types/User";
const user: User = reactive({
  name: "Victor Raji",
  id: 1,
  settings: [],
});
</script>

<template>
  <div class="flex justify-center">Login Page {{ user.name }}</div>
</template>

<style></style>
