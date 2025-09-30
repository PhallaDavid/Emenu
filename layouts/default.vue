<template>
  <div>
    <!-- Header -->
    <Header />

    <!-- Page Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </main>
    <!-- Footer -->
    <Footer class="mt-10 py-6" />
  </div>
</template>

<script setup>
import Footer from "~/components/footer.vue"; // use PascalCase file name
import Header from "~/components/header.vue"; // use PascalCase file name
</script>
