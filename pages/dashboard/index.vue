<template>
  <div>
    <div class="flex flex-row justify-between">
      <h1 class="text-2xl font-bold p-4">Dashboard</h1>
      <!-- <NuxtLink to="/pos" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center
              ">
        POS
      </NuxtLink> -->
    </div>
    <Noname />
    <ProductChart />
  </div>
</template>
<script setup>
import ProductChart from "~~/components/productChart.vue";
import Noname from "~~/components/noname.vue";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
