<template>
  <div class="w-full mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Create Product</h1>
      <NuxtLink
        to="/products/list"
        class="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
      >
        <i class="ri-arrow-left-line"></i> Back
      </NuxtLink>
    </div>

    <form
      @submit.prevent="createProduct"
      class="rounded space-y-6"
      enctype="multipart/form-data"
    >
      <!-- Name + Slug -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Name</label
          >
          <input
            v-model="product.name"
            placeholder="Enter Product Name"
            type="text"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Slug</label
          >
          <input
            v-model="product.slug"
            placeholder="Enter Product Slug"
            type="text"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
      </div>

      <!-- SKU + Description -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >SKU</label
          >
          <input
            placeholder="Enter Product SKU"
            v-model="product.sku"
            type="text"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            placeholder="Enter Product Description"
            v-model="product.description"
            rows="3"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Image + Price -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Product Image</label
          >
          <input
            type="file"
            @change="handleFileChange"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div v-if="previewImage" class="mt-3">
            <img
              :src="previewImage"
              class="w-24 h-24 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Price</label
          >
          <input
            placeholder="Enter Product Price"
            v-model.number="product.price"
            type="number"
            step="0.01"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <!-- Stock + Active -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Stock</label
          >
          <input
            placeholder="Enter Product Stock"
            v-model.number="product.stock"
            type="number"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div class="flex items-center mt-6 md:mt-8">
          <input
            type="checkbox"
            v-model="product.is_active"
            id="is_active"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="is_active" class="ml-2 text-sm text-gray-700"
            >Active</label
          >
        </div>
      </div>

      <!-- Category + Subcategory -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Category</label
          >
          <select
            v-model="product.category_id"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Subcategory</label
          >
          <select
            v-model="product.subcategory_id"
            class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
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
      </div>

      <!-- Submit -->
      <div class="pt-4 border-t border-gray-100">
        <button
          type="submit"
          class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm inline-flex items-center transition-all duration-200"
        >
          <i class="ri-save-3-line mr-2"></i>
          Create
        </button>
      </div>
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

const filteredSubcategories = computed(() =>
  product.value.category_id
    ? subcategories.value.filter(
        (sub) => sub.parent_id === product.value.category_id
      )
    : []
);

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
    Object.entries(product.value).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (file.value) formData.append("image", file.value);

    await $api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("✅ Product created successfully!");
    router.push("/products/list");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to create product.");
  }
};

onMounted(() => {
  fetchCategories();
  fetchSubcategories();
});
</script>
