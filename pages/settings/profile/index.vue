<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <ProfileCard />
  </div>
</template>

<script setup>
import ProfileCard from "~/components/profileCard.vue"


definePageMeta({
  layout: "dashboard"
})
</script>
