<template>
  <aside
    :class="[
      'fixed left-0 pt-1 z-40 h-screen w-64 bg-white shadow-md transition-transform duration-300 ease-in-out ',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0',
    ]"
    aria-label="Sidebar"
  >
    <div class="flex flex-col h-full px-4 py-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800">Dashboard</h2>
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          class="p-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <font-awesome-icon class="w-5 h-5" :icon="['fas', 'bars']" />
        </button>
      </div>

      <!-- Menu -->
      <ul class="flex-1 space-y-2 font-medium">
        <li>
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'house']" />
            <span>Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/orders"
            class="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'clipboard-list']" />
            <span>Orders</span>
          </NuxtLink>
        </li>
        <li>
          <!-- Parent item -->
          <button
            @click="isOpen = !isOpen"
            class="flex items-center justify-between w-full gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <div class="flex items-center gap-3">
              <font-awesome-icon :icon="['fas', 'boxes']" />
              <span>Products</span>
            </div>
            <font-awesome-icon
              :icon="['fas', isOpen ? 'chevron-up' : 'chevron-down']"
              class="text-sm"
            />
          </button>

          <!-- Child links -->
          <ul v-if="isOpen" class="ml-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/products/list"
                class="block p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Product List
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/category"
                class="block p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Categorys
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <NuxtLink
            to="/users"
            class="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'user']" />
            <span>Users</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/settings"
            class="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <font-awesome-icon :icon="['fas', 'cog']" />
            <span>Settings</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Footer -->
      <div class="mt-auto pt-4 border-t border-gray-200">
        <button
          @click="logout"
          class="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { inject } from "vue";
const router = useRouter();
const isOpen = ref(false);

const isSidebarOpen = inject("isSidebarOpen");
const logout = () => {
  user.value = null;
  localStorage.removeItem("access_token");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("user");
  sidebarOpen.value = false;
  router.push("/");
};
</script>
