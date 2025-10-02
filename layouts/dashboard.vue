<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Page content wrapper -->
    <div class="flex-1 flex flex-col min-h-screen sm:ml-64">
      <!-- Top bar (mobile only) -->
      <header
        class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 shadow-md sm:hidden"
      >
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          type="button"
          class="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
        >
          <font-awesome-icon class="w-5 h-5" :icon="['fas', 'bars']" />
        </button>
      </header>

      <!-- Main content (slot for pages) -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Sidebar from '~/components/Sidebar.vue'

const isSidebarOpen = ref(false)
provide('isSidebarOpen', isSidebarOpen)
</script>
