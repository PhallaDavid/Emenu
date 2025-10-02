<template>
  <header class="bg-white/30 text-gray-800 p-2 sticky top-0 z-50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 relative">
        <NuxtLink to="/" class="text-2xl font-bold text-gray-800 transition-colors">
          <NuxtLink to="/dashboard" v-if="isAuthenticated"><img src="/images/dashboard.png"
              class="rounded-full w-12 h-12" alt="Logo"></NuxtLink>
          <img v-else src="/images/kh1.PNG" class="rounded-full w-12 h-12" alt="Logo" />
        </NuxtLink>
        <div class="flex items-center space-x-2">
          <div class="relative">
            <!-- Notification Bell -->
            <button @click="toggleDropdown"
              class="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
              aria-label="Notifications">
              <font-awesome-icon :icon="['fas', 'bell']" />
            </button>

            <!-- Badge -->
            <span v-if="noti.length > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
              {{ noti.length }}
            </span>

            <!-- Dropdown -->
            <transition name="fade">
              <div v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-3xl border border-gray-200 z-50">
                <div class="p-2">
                  <div v-for="(item, index) in notification" :key="index"
                    class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'info-circle']" class="text-blue-500" />
                    <span class="text-gray-800 text-sm">{{ item }}</span>
                  </div>
                  <div v-if="notification.length === 0" class="text-gray-500 text-center p-2 text-sm">
                    No notifications
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Cart -->
          <div v-if="!isAuthenticated" class="relative">
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
            <font-awesome-icon :icon="['fas', 'user']" />
          </button>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="sidebarOpen" class="fixed inset-0 backdrop-blur-sm z-50 flex justify-end"
        @click.self="sidebarOpen = false">
        <div class="w-72 h-full p-6 flex flex-col animate-slide-in">
          <button @click="sidebarOpen = false" class="self-end px-2 py-2 text-gray-800 hover:text-gray-800 mb-6">
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
import { ref, computed } from "vue";
import LoginModal from "~/components/login.vue";
const cart = useState("cart", () => []);
const showCartModal = useState("showCartModal", () => false);
const noti = useState("noti", () => [1, 2, 3]);
const notification = ref([
  "Order #123",
  "New message from John",
  "Order #456",
]);
const router = useRouter();
const sidebarOpen = ref(false);
const showLoginModal = ref(false);
const user = useState("user", () => null);
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const isAuthenticated = computed(() => !!user.value);
const openLogin = () => {
  showLoginModal.value = true;
  sidebarOpen.value = false;
};
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
