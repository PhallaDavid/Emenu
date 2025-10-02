<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Users</h1>
    <NuxtLink to="/users">Back</NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
