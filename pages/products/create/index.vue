<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Create Product</h1>

    <NuxtLink
      to="/products/list"
      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs mb-4 inline-block"
    >
      Back
    </NuxtLink>

    <form
      @submit.prevent="createProduct"
      class="space-y-4 bg-white p-6 rounded shadow-md"
      enctype="multipart/form-data"
    >
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="product.name"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="product.description"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          rows="3"
        ></textarea>
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Product Image</label
        >
        <input type="file" @change="handleFileChange" class="mt-1" />
        <div v-if="previewImage" class="mt-2">
          <img :src="previewImage" class="w-32 h-32 object-cover rounded" />
        </div>
      </div>

      <!-- Price -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input
          v-model.number="product.price"
          type="number"
          step="0.01"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <!-- Stock -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Stock</label>
        <input
          v-model.number="product.stock"
          type="number"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <!-- Active -->
      <div class="flex items-center space-x-2">
        <input type="checkbox" v-model="product.is_active" />
        <label class="text-sm text-gray-700">Active</label>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <select
          v-model="product.category_id"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="" disabled>Select Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Subcategory -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Subcategory</label
        >
        <select
          v-model="product.subcategory_id"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="" disabled>Select Subcategory</option>
          <option
            v-for="sub in filteredSubcategories"
            :key="sub.id"
            :value="sub.id"
          >
            {{ sub.name }}
          </option>
        </select>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
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

// Filter subcategories based on selected category
const filteredSubcategories = computed(() => {
  if (!product.value.category_id) return [];
  return subcategories.value.filter(
    (sub) => sub.category_id === product.value.category_id
  );
});

// Fetch categories & subcategories
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

// Create product
const createProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", product.value.name);
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
