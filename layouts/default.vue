<template>
  <div class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide">
    <!-- Header -->
    <Header />

    <!-- Page Content -->
    <main class="max-w-7xl mx-auto p-2 ">
      <slot />
    </main>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/footer.vue"; // use PascalCase file name
import Header from "~/components/header.vue"; // use PascalCase file name
</script>
