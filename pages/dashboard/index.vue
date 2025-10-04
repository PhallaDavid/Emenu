<template>
  <div>
    <h1 class="text-2xl font-bold p-4">Dashboard</h1>
    <Noname />
    <ProductChart />

  </div>
</template>
<script setup>
import ProductChart from '~~/components/productChart.vue'
import Noname from '~~/components/noname.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>
    