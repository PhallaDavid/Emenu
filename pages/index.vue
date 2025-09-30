<!-- pages/index.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">{{ $t("menu") }}</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('search')"
        class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
        :aria-label="$t('search')"
      />
    </div>

    <!-- Category Tabs -->
    <div class="flex overflow-x-auto space-x-3 p-4 mb-6 pb-2" role="tablist">
      <button
        @click="selectCategory('all')"
        :class="[
          'bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800',
          selectedCategory === 'all'
            ? 'bg-gray-800 text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-gray-800',
        ]"
        role="tab"
        :aria-selected="selectedCategory === 'all'"
      >
        {{ $t("all") }}
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        :class="[
          'bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800',
          selectedCategory === category.id
            ? 'bg-gray-800 text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-gray-800',
        ]"
        role="tab"
        :aria-selected="selectedCategory === category.id"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="flex justify-center self-center py-12 text-gray-500 text-lg"
    >
      <LoadingSpinner />
    </div>

    <!-- Menu Items -->
    <div
      v-else-if="filteredItems.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="bg-gray-100 border cursor-pointer rounded-xl p-4 shadow transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        tabindex="0"
        @keydown.enter="addToCart(item)"
        @click="showDetails(item)"
        role="button"
        :aria-label="`View details of ${item.name}`"
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
          @click.stop="addToCart(item)"
          class="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          :aria-label="`Add ${item.name} to cart`"
        >
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
          {{ $t("addToCart") }}
        </button>
      </div>
    </div>

    <!-- No Items -->
    <div v-else class="text-center py-12 text-gray-400 text-lg">
      {{ $t("noItems") }}
    </div>
    <button class="px-2 py-4 bg-red-300"   @click="showDetails(item)" ></button>

    <!-- Modals -->
    <CartModal
      :show="showCartModal"
      :cart="cart"
      @close="showCartModal = false"
      @remove="removeFromCart"
      @checkout="handleCheckout"
    />
    <ProductDetailModal
      :show="showProductModal"
      :product="selectedProduct"
      @close="showProductModal = false"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import LoadingSpinner from "~/components/laoding.vue";
import CartModal from "~/components/CartModal.vue";
import ProductDetailModal from "~/components/ProductDetailModal.vue";

const categories = ref([]);
const allProducts = ref([]);
const items = ref([]);
const selectedCategory = ref(null);
const loading = ref(false);
const searchQuery = ref("");

// Reactive modal states
const selectedProduct = ref(null);
const showProductModal = ref(false);

// Cart state (persistent)
const cart = useState("cart", () => []);
const showCartModal = useState("showCartModal", () => false);

// Nuxt API
const { $api } = useNuxtApp();

// Filtered items for search
const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Fetch all products
async function fetchAllProducts() {
  try {
    const response = await $api.get("/products");
    allProducts.value = response.data.products;
  } catch (err) {
    console.error("API error:", err);
  }
}

// Select category
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

// Add to cart
function addToCart(item) {
  cart.value.push(item);
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

// Show product detail modal
function showDetails(item) {
  selectedProduct.value = item;
  showProductModal.value = true;
}

// Remove from cart
function removeFromCart(index) {
  cart.value.splice(index, 1);
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

// Checkout placeholder
function handleCheckout() {
  alert("Checkout functionality will be implemented later");
}

// Fetch data on mount
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
.flex::-webkit-scrollbar {
  display: none;
}
.flex {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
