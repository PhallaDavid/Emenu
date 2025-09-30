<!-- pages/index.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">{{ $t('menu') }}</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('search')"
        class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        :aria-label="$t('search')"
      />
    </div>

    <!-- Category Tabs -->
    <div class="flex overflow-x-auto space-x-3 mb-6 pb-2" role="tablist">
      <button
        @click="selectCategory('all')"
        :class="[
          'px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500',
          selectedCategory === 'all'
            ? 'bg-green-500 text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600',
        ]"
        role="tab"
        :aria-selected="selectedCategory === 'all'"
      >
        {{ $t('all') }}
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        :class="[
          'px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500',
          selectedCategory === category.id
            ? 'bg-green-500 text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600',
        ]"
        role="tab"
        :aria-selected="selectedCategory === category.id"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12 text-gray-500 text-lg">
      Loading...
    </div>

    <!-- Menu Items -->
    <div
      v-else-if="filteredItems.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="bg-white border cursor-pointer rounded-xl p-4 shadow transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        tabindex="0"
        @keydown.enter="addToCart(item)"
        role="button"
        aria-label="Add {{ item.name }} to cart"
      >
        <div>
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="h-40 w-full object-cover rounded-lg mb-3"
            loading="lazy"
          />
          <div class="font-semibold text-xl text-gray-800 mb-1">
            {{ item.name }}
          </div>
          <div class="text-lg font-bold text-green-600 mb-3">
            ${{ item.price }}
          </div>
        </div>
        <button
          @click="addToCart(item)"
          class="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Add to cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m5-8v8m4-8v8m4-8l2 8"
            />
          </svg>
          {{ $t('addToCart') }}
        </button>
      </div>
    </div>

    <!-- No Items -->
    <div v-else class="text-center py-12 text-gray-400 text-lg">
      {{ $t('noItems') }}
    </div>

    <!-- Cart Modal -->
    <div
      v-if="showCartModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showCartModal = false"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative"
        @click.stop
      >
        <h2 class="text-2xl font-bold mb-4">{{ $t('yourCart') }}</h2>
        <div v-if="cart.length === 0" class="text-center py-8 text-gray-500">
          {{ $t('cartEmpty') }}
        </div>
        <div v-else class="space-y-4 max-h-64 overflow-y-auto">
          <div
            v-for="(item, index) in cart"
            :key="index"
            class="flex items-center space-x-4 border-b pb-4"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="h-16 w-16 object-cover rounded"
            />
            <div class="flex-1">
              <div class="font-semibold">{{ item.name }}</div>
              <div class="text-green-600">${{ item.price }}</div>
            </div>
            <button
              @click="removeFromCart(index)"
              class="text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="cart.length > 0" class="mt-4 pt-4 border-t">
          <div class="flex justify-between text-lg font-bold">
            <span>{{ $t('total') }}</span>
            <span
              >${{
                cart
                  .reduce((sum, item) => sum + parseFloat(item.price), 0)
                  .toFixed(2)
              }}</span
            >
          </div>
          <button
            class="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {{ $t('checkout') }}
          </button>
        </div>
        <button
          @click="showCartModal = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const categories = ref([]);
const allProducts = ref([]);
const items = ref([]);
const selectedCategory = ref(null);
const loading = ref(false);
const searchQuery = ref("");
const cart = useState("cart", () => []);
const showCartModal = useState("showCartModal", () => false);
const { $api } = useNuxtApp();

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function fetchAllProducts() {
  try {
    const response = await $api.get("/products");
    allProducts.value = response.data.products;
  } catch (err) {
    console.error("API error:", err);
  }
}

function selectCategory(categoryId) {
  selectedCategory.value = categoryId;
  if (categoryId === "all") {
    items.value = allProducts.value;
  } else {
    items.value = allProducts.value.filter(
      (item) => item.category_id === categoryId
    );
  }
}

function addToCart(item) {
  cart.value.push(item);
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

function removeFromCart(index) {
  cart.value.splice(index, 1);
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

onMounted(async () => {
  if (process.client) {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart.value = JSON.parse(savedCart);
    }
  }
  loading.value = true;
  try {
    await Promise.all([
      fetchAllProducts(),
      (async () => {
        const response = await $api.get("/categories");
        categories.value = response.data.categories;
      })(),
    ]);
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0].id;
      selectCategory(selectedCategory.value);
    }
  } catch (err) {
    console.error("API error:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Hide scrollbar on tabs */
.flex::-webkit-scrollbar {
  display: none;
}
.flex {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
