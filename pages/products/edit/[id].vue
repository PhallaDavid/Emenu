<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Product</h1>

    <NuxtLink
      to="/products/list"
      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs mb-4 inline-block"
    >
      Back
    </NuxtLink>

    <form
      @submit.prevent="updateProduct"
      class="space-y-4 bg-white p-6 rounded shadow-md"
      enctype="multipart/form-data"
    >
     <!-- Name + Slug -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
          <input v-model="product.name" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " required />
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Slug</label>
          <input v-model="product.slug" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " required />
        </div>
      </div>

      <!-- SKU + Description -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Sku</label>
          <input v-model="product.sku" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " required />
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
          <textarea v-model="product.description" rows="3" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  "></textarea>
        </div>
      </div>

      <!-- Image + Price -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Product Image</label>
          <input type="file" @change="handleFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                   bg-gray-50  " />
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" class="w-20 h-20 rounded-lg object-cover" />
          </div>
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
          <input v-model.number="product.price" type="number" step="0.01" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " />
        </div>
      </div>

      <!-- Stock + Active -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
          <input v-model.number="product.stock" type="number" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " />
        </div>
        <div class="flex items-center mt-4 md:mt-0">
          <input type="checkbox" v-model="product.is_active" class="mr-2" />
          <label class="text-sm text-gray-700 ">Active</label>
        </div>
      </div>

      <!-- Category + Subcategory -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
          <select v-model="product.category_id" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  ">
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Subcategory</label>
          <select v-model="product.subcategory_id" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  ">
            <option value="" disabled>Select Subcategory</option>
            <option v-for="sub in filteredSubcategories" :key="sub.id" :value="sub.id">
              {{ sub.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Update Product
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const { $api } = useNuxtApp();

const product = ref({
  name: "",
  slug: "",
  sku: "",
  description: "",
  image_url: "",
  price: 0,
  stock: 0,
  is_active: true,
  category_id: null,
  subcategory_id: null,
});

const categories = ref([]);
const subcategories = ref([]);
const file = ref(null);
const previewImage = ref("");

const filteredSubcategories = computed(() => {
  if (!product.value.category_id) return [];
  return subcategories.value.filter(
    (sub) => sub.category_id === product.value.category_id
  );
});

// Fetch product by ID
const fetchProduct = async () => {
  try {
    const res = await $api.get(`/products/${route.params.id}`);
    product.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const fetchCategories = async () => {
  try {
    const res = await $api.get("/categories");
    categories.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const fetchSubcategories = async () => {
  try {
    const res = await $api.get("/subcategories");
    subcategories.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Handle file input
const handleFileChange = (e) => {
  file.value = e.target.files[0];
  previewImage.value = URL.createObjectURL(file.value);
};

// Update product
const updateProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", product.value.name);
    formData.append("slug", product.value.slug);
    formData.append("sku", product.value.sku);
    formData.append("description", product.value.description);
    formData.append("price", product.value.price);
    formData.append("stock", product.value.stock);
    formData.append("is_active", product.value.is_active ? 1 : 0);
    formData.append("category_id", product.value.category_id);
    formData.append("subcategory_id", product.value.subcategory_id);

    if (file.value) {
      formData.append("image", file.value);
    }

    await $api.put(`/products/${route.params.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product updated successfully!");
    router.push("/products/list");
  } catch (err) {
    console.error(err);
    alert("Failed to update product.");
  }
};

onMounted(() => {
  fetchProduct();
  fetchCategories();
  fetchSubcategories();
});
</script>
