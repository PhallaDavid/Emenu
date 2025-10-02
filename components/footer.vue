<template>
  <footer class="bg-white/30 text-white pb-0 py-8 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto  sm:px-6 lg:px-8">
      <div
        class="border-t border-gray-800 font-semibold mt-8 pt-6 text-center text-sm text-gray-800"
      >
        © {{ currentYear }} K&H Coffee. All rights reserved.
      </div>
    </div>
  </footer>
</template>
<script setup>
const currentYear = new Date().getFullYear();
</script>
