<template>
  <header class="bg-green-600 text-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-2xl font-bold hover:text-gray-200 transition-colors"
          aria-label="K&H Coffee Home"
        >
          K&H Coffee
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="md:flex items-center space-x-6">
          <!-- Language Switcher -->
          <LanguageSwitcher />
          <!-- Cart -->
          <button
            @click="showCartModal = true"
            class="relative hover:text-gray-200 transition-colors"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.1"
              />
            </svg>
            <span
              v-if="cart.length > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1 min-w-[1.25rem] h-5 flex items-center justify-center"
              >{{ cart.length }}</span
            >
          </button>
          <button
            class="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const showMobileMenu = ref(false);
const cart = useState("cart", () => []);
const showCartModal = useState("showCartModal", () => false);
</script>
