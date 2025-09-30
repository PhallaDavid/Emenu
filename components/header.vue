<template>
  <header class="bg-gray-100 text-gray-800 p-2 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 relative">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-gray-800 transition-colors">
          <img src="/static/images/kh1.png" class="rounded-full w-12 h-12   " alt="">
        </NuxtLink>
        <!-- Desktop Actions -->
        <div class="flex items-center space-x-2">
          <LanguageSwitcher />
          <!-- Cart -->
          <div class="relative">
            <button @click="showCartModal = true"
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
              aria-label="Open cart">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" />
            </button>
            <span v-if="cart.length > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
              {{ cart.length }}
            </span>
          </div>
          <!-- Login Button -->
          <button
            class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
            aria-label="Login">
            Login
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

// State
const cart = useState("cart", () => []);
const showCartModal = useState("showCartModal", () => false);
</script>
