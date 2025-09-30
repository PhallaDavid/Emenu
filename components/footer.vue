<template>
  <footer class="bg-gray-100 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-800"
      >
        © {{ currentYear }} K&H Coffee. All rights reserved.
      </div>
    </div>
  </footer>
</template>
<script setup>
const currentYear = new Date().getFullYear();
</script>
