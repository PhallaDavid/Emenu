<template>
  <header class="bg-white/30 text-gray-800 p-2 sticky top-0 z-50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 relative">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-gray-800 transition-colors">
          <NuxtLink to="/dashboard" v-if="isAuthenticated">
            <img src="/images/dashboard.png" class="rounded-full w-12 h-12" alt="Logo">
          </NuxtLink>
          <img v-else src="/images/kh1.PNG" class="rounded-full w-12 h-12" alt="Logo" />
        </NuxtLink>

        <div class="flex items-center space-x-2">
          <!-- Notification Bell -->
          <div class="relative">
            <button @click="toggleDropdown"
              class="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
              aria-label="Notifications">
              <font-awesome-icon :icon="['fas', 'bell']" />
            </button>

            <!-- Badge: always visible if there are new orders -->
            <span v-if="noti.length > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
              {{ noti.length }}
            </span>

            <!-- Dropdown -->
            <transition name="fade">
              <div v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-3xl border border-gray-200 z-50">
                <div class="p-2 max-h-64 overflow-y-auto">
                  <!-- Show all notifications -->
                  <div v-for="(item, index) in noti" :key="index"
                    class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'info-circle']" class="text-blue-500" />
                    <span class="text-gray-800 text-sm">
                      Order #{{ item.id }} - Table {{ item.table_number }}
                    </span>
                  </div>

                  <!-- Show "No notifications" only if nothing exists -->
                  <div v-if="noti.length === 0" class="text-gray-500 text-center p-2 text-sm">
                    No notifications
                  </div>
                </div>
              </div>
            </transition>
          </div>


          <!-- Cart and User buttons (unchanged) -->
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

    <!-- Sidebar and Login Modal (unchanged) -->
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
import { ref, computed, onMounted } from "vue";
import LoginModal from "~/components/login.vue";
const { $api } = useNuxtApp();
const cart = useState("cart", () => []);
const showCartModal = useState("showCartModal", () => false);
const noti = useState("noti", () => []); // holds new orders
const dropdownOpen = ref(false);

const sidebarOpen = ref(false);
const showLoginModal = ref(false);
const user = useState("user", () => null);
const router = useRouter();
const isAuthenticated = computed(() => !!user.value);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
  if (dropdownOpen.value) noti.value = []; // clear notifications when opened
};

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

// --- Fetch orders from GET API and show notifications ---
const orders = ref([]);

const fetchOrders = async () => {
  try {
    // Use your provided $api instance
    const response = await $api.get("/orders"); // <-- calls https://54.196.237.240/api/orders
    const latestOrders = response.data; // Axios wraps response in `data`

    if (orders.value.length > 0) {
      const newOrders = latestOrders.filter(
        o => !orders.value.find(existing => existing.id === o.id)
      );
      if (newOrders.length > 0) {
        noti.value.push(...newOrders); // push new orders to notifications
      }
    }

    orders.value = latestOrders;
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }
};



onMounted(() => {
  fetchOrders();
  setInterval(fetchOrders, 10000); // poll every 5 seconds
});
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
