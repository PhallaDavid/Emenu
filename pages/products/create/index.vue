<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Create Product</h1>

    <NuxtLink to="/products/list" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
             font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 
             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Back
    </NuxtLink>

    <form @submit.prevent="createProduct" class="space-y-6 bg-white p-6 rounded shadow-md"
      enctype="multipart/form-data">
      <!-- Name + Slug -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input v-model="product.name" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
          <input v-model="product.slug" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
        </div>
      </div>

      <!-- SKU + Description -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sku</label>
          <input v-model="product.sku" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea v-model="product.description" rows="3" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
        </div>
      </div>

      <!-- Image + Price -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
          <input type="file" @change="handleFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                   bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600" />
          <div v-if="previewImage" class="mt-2">
            <img :src="previewImage" class="w-20 h-20 rounded-lg object-cover" />
          </div>
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input v-model.number="product.price" type="number" step="0.01" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </div>

      <!-- Stock + Active -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
          <input v-model.number="product.stock" type="number" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div class="flex items-center mt-4 md:mt-0">
          <input type="checkbox" v-model="product.is_active" class="mr-2" />
          <label class="text-sm text-gray-700 dark:text-white">Active</label>
        </div>
      </div>

      <!-- Category + Subcategory -->
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
          <select v-model="product.category_id" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div class="flex-1 mt-4 md:mt-0">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subcategory</label>
          <select v-model="product.subcategory_id" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select Subcategory</option>
            <option v-for="sub in filteredSubcategories" :key="sub.id" :value="sub.id">
              {{ sub.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Submit -->
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
               dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Create Product
      </button>
    </form>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

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
    (sub) => sub.parent_id === product.value.category_id
  );
});

const fetchCategories = async () => {
  try {
    const res = await $api.get("/categories");
    categories.value = res.data.categories;
  } catch (err) {
    console.error(err);
  }
};

const fetchSubcategories = async () => {
  try {
    const res = await $api.get("/subcategories");
    subcategories.value = res.data.subcategories;
  } catch (err) {
    console.error(err);
  }
};

const handleFileChange = (e) => {
  file.value = e.target.files[0];
  previewImage.value = URL.createObjectURL(file.value);
};

const createProduct = async () => {
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

    await $api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product created successfully!");
    router.push("/products/list");
  } catch (err) {
    console.error(err);
    alert("Failed to create product.");
  }
};

onMounted(() => {
  fetchCategories();
  fetchSubcategories();
});
</script>
