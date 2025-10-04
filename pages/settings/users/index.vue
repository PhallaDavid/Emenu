<template>
  <div>
    <div class="flex flex-row justify-between items-center p-4">
      <h1 class="text-2xl font-bold">Users</h1>
      <NuxtLink
        to="/settings/users/create"
         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
               "
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
