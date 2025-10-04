<template>
  <div>
    <div class="flex flex-row justify-between">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <nuxt-link
      to="/products/create"
       class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
              "
    >
      Create
    </nuxt-link>
    </div>
    <ListProduct />
  </div>
</template>

<script setup>
import ListProduct from "~/components/list_product.vue"; 

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
