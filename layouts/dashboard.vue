<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Page content wrapper -->
    <div class="flex-1 flex flex-col min-h-screen sm:ml-64">
      <!-- Top bar (mobile only) -->
      <header
        class="flex items-center justify-between p-4 bg-gray-50 shadow-md sm:hidden"
      >
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          type="button"
          class="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focuxs:ring-2 focus:ring-gray-200"
        >
          <font-awesome-icon class="w-5 h-5" :icon="['fas', 'bars']" />
        </button>
      </header>

      <!-- Persistent Header (desktop & mobile) -->
      <header
        class="hidden sm:flex items-center justify-end p-4 bg-white shadow-md border-b"
      >
        <!-- <div class="text-xl font-semibold text-gray-800">Dashboard</div> -->
        <div class="flex items-center space-x-4">
          <!-- <button
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Notifications
          </button> -->
          <div class="flex items-center space-x-2">
            <select
              name="tarnslate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id=""
            >
              <option value="en">EN</option>
              <option value="kh">KH</option>
            </select>
            <img
              src="/images/kh1.PNG"
              alt="Profile"
              class="w-8 h-8 rounded-full"
            />
            <span class="text-gray-700">{{ user.name || "Guest" }}</span>
          </div>
        </div>
      </header>
      <main class="p-4 flex-1 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import Sidebar from "~/components/Sidebar.vue";

const user = ref({});
const isSidebarOpen = ref(false);
provide("isSidebarOpen", isSidebarOpen);

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
      console.log("User from localStorage:", user.value);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  }
});
</script>
