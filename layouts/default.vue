<template>
  <div class="antialiased bg-white">
    <!-- Header -->
    <Header />

    <!-- Page Content -->
    <main class="max-w-7xl mx-auto p-2 ">
      <slot />
    </main>
    <!-- Footer -->
    <Footer class="pb-0" />
  </div>
</template>

<script setup>
import Footer from "~/components/footer.vue"; // use PascalCase file name
import Header from "~/components/header.vue"; // use PascalCase file name
</script>
<style scoped>
html, body {
  margin: 0;
  padding: 0;
}
</style>