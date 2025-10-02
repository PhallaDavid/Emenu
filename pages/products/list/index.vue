<template>
  <div>
    <div class="flex flex-row justify-between">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <nuxt-link
      to="/products/create"
      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs mb-4 inline-block"
    >
      Create
    </nuxt-link>
    </div>
    <ListProduct />
  </div>
</template>

<script setup>
import ListProduct from "~/components/list_product.vue"; // ensure the file name matches exactly

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
