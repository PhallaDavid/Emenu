<!-- pages/index.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">{{ $t("menu") }}</h1>

    <!-- Search Bar -->
    <div class="mb-6 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('search')"
        class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
        :aria-label="$t('search')"
      />
      <!-- <button
        class="px-4 py-2 bg-gray-100 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        <span class="text-gray-800">Search</span>
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="text-gray-800"
        />
      </button> -->
    </div>

    <!-- Category Tabs -->
    <div
      class="flex overflow-x-auto space-x-3 p-4 mb-6 pb-2 scrollbar-hide"
      role="tablist"
    >
      <button
        @click="selectCategory('all')"
        :class="[
          'flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800',
          selectedCategory === 'all'
            ? 'bg-gray-800 text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-gray-100',
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
          'flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800',
          selectedCategory === category.id
            ? 'bg-gray-800 text-white shadow'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-gray-100',
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
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="border cursor-pointer gap-1 rounded-xl shadow transform flex flex-col justify-between relative"
        tabindex="0"
        @keydown.enter="addToCart(item)"
        @click="showDetails(item)"
        role="button"
        :aria-label="`View details of ${item.name}`"
      >
        <div class="relative">
          <!-- Image -->
          <img
            v-if="item.image_url"
            :src="item.image_url"
            :alt="item.name"
            class="h-40 w-full object-cover rounded-xl mb-3"
            loading="lazy"
          />

          <!-- Floating Add-to-Cart -->
          <button
            @click.stop="handleAddToCart(item)"
            class="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-sm ring-1 ring-white/30 text-gray-800 p-2 hover:bg-white/60 transition"
            :aria-label="`Add ${item.name} to cart`"
          >
            <div class="flex items-center justify-center w-full h-full">
              <span v-if="loadingItems.includes(item.id)">
                <Spin class="w-4 h-4" />
              </span>
              <span v-else>
                <font-awesome-icon
                  :icon="['fas', 'shopping-cart']"
                  class="text-sm text-gray-100"
                />
              </span>
            </div>
          </button>
        </div>

        <!-- Product info -->
        <div>
          <div
            class="flex flex-row justify-between p-2 lg:flex-row md:flex-col sm:flex-col"
          >
            <div class="lg:text-lg text-gray-800 mb-1 sm:text-xs md:text-xs">
              {{ item.name }}
            </div>
            <div class="lg:text-lg text-gray-800 mb-1 sm:text-xs md:text-xs">
              ${{ item.price }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Items -->
    <div v-else class="text-center py-12 text-gray-400 text-lg">
      {{ $t("noItems") }}
    </div>

    <!-- Modals -->
    <CartModal
      :show="showCartModal"
      :cart="cart"
      @close="showCartModal = false"
      @remove="removeItem"
      @decrease="decreaseQuantity"
      @increase="increaseQuantity"
      @checkout-confirm="handleCheckoutConfirm"
    />
    <ProductDetailModal
      :show="showProductModal"
      :product="selectedProduct"
      @close="showProductModal = false"
      @add-to-cart="addToCart"
    />
    <!-- Table Modal -->
    <TableSelectModal :show="showTableModal" @confirm="handleTableConfirm" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import LoadingSpinner from "~/components/laoding.vue";
import CartModal from "~/components/CartModal.vue";
import ProductDetailModal from "~/components/ProductDetailModal.vue";
import Spin from "~/components/spin.vue";
import TableSelectModal from "~/components/TableSelectModal.vue";

const route = useRoute();

const categories = useState("categories", () => []);
const allProducts = useState("allProducts", () => []);
const items = ref([]);
const selectedCategory = ref(null);
const loading = ref(false);
const searchQuery = ref("");
const showTableModal = ref(false);
const tableNumber = ref("");

// reactive loading states for cart buttons
const loadingItems = ref([]);

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
function handleTableConfirm(number) {
  tableNumber.value = number;
  showTableModal.value = false;
  console.log("Selected table:", tableNumber.value);
}

// Add to cart
function addToCart(item) {
  let existing = cart.value.find((cartItem) => cartItem.id === item.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

// Handle add to cart with spinner
async function handleAddToCart(item) {
  if (!loadingItems.value.includes(item.id)) {
    loadingItems.value.push(item.id);
  }

  try {
    // simulate async delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    addToCart(item);
  } finally {
    loadingItems.value = loadingItems.value.filter((id) => id !== item.id);
  }
}

// Show product detail modal
function showDetails(item) {
  selectedProduct.value = item;
  showProductModal.value = true;
}

// Remove item from cart
function removeItem(index) {
  cart.value.splice(index, 1);
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

// Decrease quantity
function decreaseQuantity(index) {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--;
  } else {
    cart.value.splice(index, 1);
  }
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

// Increase quantity
function increaseQuantity(index) {
  cart.value[index].quantity++;
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
}

async function handleCheckoutConfirm() {
  try {
    const totalPrice = cart.value
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);

    const orderItems = cart.value.map((item) => ({
      product_id: item.id,
      qty: item.quantity,
    }));

    const payload = {
      table_number: tableNumber.value,
      items: orderItems,
      total_price: parseFloat(totalPrice),
    };

    await $api.post("/orders", payload);

    cart.value = [];
    if (process.client) {
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
    showCartModal.value = false;
    alert("Order placed successfully!");
  } catch (error) {
    console.error("Order submission error:", error);
    alert("Failed to place order. Please try again.");
  }
}

onMounted(async () => {
  // Check for table query parameter
  const table = route.query.table;
  if (table) {
    tableNumber.value = table;
    console.log("Table from URL:", tableNumber.value);
  } else {
    showTableModal.value = true;
  }

  if (process.client) {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart.value = JSON.parse(savedCart).map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
    }
  }

  loading.value = true;
  try {
    await Promise.all([
      allProducts.value.length === 0 ? fetchAllProducts() : Promise.resolve(),
      categories.value.length === 0
        ? (async () => {
            const response = await $api.get("/categories");
            categories.value = response.data.categories;
          })()
        : Promise.resolve(),
    ]);

    if (categories.value.length > 0) {
      selectedCategory.value = "all";
      selectCategory("all");
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
