<template>
  <div class="overflow-x-auto mt-4">
    <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            ID
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Image
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Name
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            SKU
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Price
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Stock
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Category
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Sub Category
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Status
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 text-sm text-gray-700">{{ product.id }}</td>
          <td class="px-4 py-2">
            <img :src="product.image_url" alt="product image" class="w-12 h-12 object-cover rounded" />
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">{{ product.name }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">{{ product.sku }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">${{ product.price }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">{{ product.stock }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ product.category?.name || "N/A" }}
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ product.subcategory_id
              || "N/A" }}
          </td>
          <td class="px-4 py-2">
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-semibold',
              statusColor(product.is_active),
            ]">
              {{ product.is_active ? "Active" : "Inactive" }}
            </span>
          </td>
          <td class="px-4 py-2 text-sm text-gray-700 space-x-2">
            <NuxtLink :to="`/products/edit/${product.id}`"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">
              Edit
            </NuxtLink>
            <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
              @click="deleteProduct(product)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-4 flex justify-center items-center space-x-2">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-200 rounded">
        Prev
      </button>

      <button v-for="page in lastPage" :key="page" @click="fetchProducts(page)" :class="[
        'px-3 py-1 rounded',
        page === currentPage
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]">
        {{ page }}
      </button>

      <button @click="nextPage" :disabled="currentPage === lastPage" class="px-3 py-1 bg-gray-200 rounded">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const perPage = 15;
const { $api } = useNuxtApp();
const statusColor = (isActive) =>
  isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
const fetchProducts = async (page = 1) => {
  try {
    const res = await $api.get(
      `/products?page=${page}&row_per_page=${perPage}`
    );
    products.value = res.data.data || [];
    currentPage.value = res.data.current_page || 1;
    lastPage.value = res.data.last_page || 1;
  } catch (err) {
    console.error("API error:", err);
    products.value = [];
  }
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    fetchProducts(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchProducts(currentPage.value);
  }
};

const deleteProduct = (product) => alert(`Delete product #${product.id}`);

onMounted(() => fetchProducts(currentPage.value));
</script>
