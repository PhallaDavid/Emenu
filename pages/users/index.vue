<template>
  <div>
    <div class="flex flex-row justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Users</h1>
      <NuxtLink
        to="/users/create"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add User
      </NuxtLink>
    </div>
    <User />
  </div>
</template>

<script setup>
import User from "~~/components/user.vue";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
