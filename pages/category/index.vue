<template>
  <div>
    <div class="flex flex-row justify-between" >
      <h1 class="text-2xl font-bold mb-4">Categorys</h1>
       <nuxt-link
        to="/category/create"
         class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs mb-4 inline-block"
      >
        Create
      </nuxt-link>
    </div>
    <Categories />
  </div>
</template>

<script setup>
import Categories from '~~/components/categories.vue'

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
