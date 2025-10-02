<template>
  <header class="bg-white/30 text-gray-800 p-2 sticky top-0 z-50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 relative">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-800 transition-colors">
          <img src="/images/kh1.PNG" class="rounded-full w-12 h-12" alt="Logo" />
        </NuxtLink>
        <div class="flex items-center space-x-2"> 
          <div class="relative">
            <button
              class="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
              aria-label="Notifications">
              <font-awesome-icon :icon="['fas', 'bell']" />
            </button>
            <span v-if="noti.length > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
              {{ noti.length }}
            </span>
          </div>

          <!-- Cart -->
          <div class="relative">
            <button @click="showCartModal = true"
              class="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
              aria-label="Open cart">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" />
            </button>
            <span v-if="cart.length > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
              {{ cart.length }}
            </span>
          </div>
          <button @click="sidebarOpen = true"
            class="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
            aria-label="Open menu">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </button>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="sidebarOpen" class="fixed inset-0 backdrop-blur-sm z-50 flex justify-end"
        @click.self="sidebarOpen = false">
        <div class="w-72 h-full p-6 flex flex-col animate-slide-in bg-white">
          <button @click="sidebarOpen = false" class="self-end px-2 py-2 text-gray-400 hover:text-gray-800 mb-6">
            <font-awesome-icon :icon="['fas', 'xmark']" size="lg" />
          </button>
          <div class="flex flex-col gap-2">
            <button v-if="!isAuthenticated" @click="openLogin"
              class="w-full bg-blue-600 text-white px-4 py-3 rounded-full font-semibold text-center hover:bg-blue-700 transition-colors">
              Login
            </button>
            <button v-if="isAuthenticated" @click="logout"
              class="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-full font-semibold text-center hover:bg-gray-300 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </transition>
    <LoginModal :show="showLoginModal" @close="showLoginModal = false" />
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import LoginModal from '~/components/login.vue'
const cart = useState("cart", () => [])
const showCartModal = useState("showCartModal", () => false)
const noti = useState("noti", () => [1, 2, 3])

const sidebarOpen = ref(false)
const showLoginModal = ref(false)
const user = useState("user", () => null)

const isAuthenticated = computed(() => !!user.value)
const openLogin = () => {
  showLoginModal.value = true
  sidebarOpen.value = false
}
const logout = () => {
  user.value = null
  localStorage.removeItem('access_token')
  sidebarOpen.value = false
  alert('Logged out successfully')
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
