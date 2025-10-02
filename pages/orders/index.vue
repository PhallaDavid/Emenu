<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Orders</h1>
    <Order />
  </div>
</template>

<script setup>
import Order from '~~/components/Order.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>
