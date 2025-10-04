<template>
  <div class="overflow-x-auto mt-4">
    <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            ID
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Name
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Description
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Image
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Parent
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Created At
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="category in categories"
          :key="category.id"
          class="hover:bg-gray-50"
        >
          <td class="px-4 py-2 text-sm text-gray-700">{{ category.id }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">{{ category.name }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ category.description || "N/A" }}
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">
            <img
              v-if="category.image"
              :src="category.image"
              alt="image"
              class="h-10 w-10 object-cover rounded"
            />
            <span v-else>N/A</span>
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ category.parent_id || "None" }}
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ formatDate(category.created_at) }}
          </td>
          <td class="px-4 py-2 text-sm text-gray-700 space-x-2">
        <NuxtLink 
  :to="{ path: '/category/edit/' + category.id }"
  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
>
  Edit
</NuxtLink>

            <button
              @click="deleteCategory(category.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-4 flex justify-center items-center space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-200 rounded"
      >
        Prev
      </button>

      <button
        v-for="page in lastPage"
        :key="page"
        @click="fetchCategories(page)"
        :class="[
          'px-3 py-1 rounded',
          page === currentPage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === lastPage"
        class="px-3 py-1 bg-gray-200 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const api = useNuxtApp().$api;
const categories = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const rowPerPage = 15;

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
};

const fetchCategories = async (page = 1) => {
  try {
    const { data } = await api.get(
      `/categories/?page=${page}&row_per_page=${rowPerPage}`
    );
    categories.value = data.categories;
    currentPage.value = page;
    lastPage.value = data.total_pages || 1;
  } catch (error) {
    console.log(error);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) fetchCategories(currentPage.value - 1);
};

const nextPage = () => {
  if (currentPage.value < lastPage.value)
    fetchCategories(currentPage.value + 1);
};

const deleteCategory = async (id) => {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    await api.delete(`/categories/${id}`);
    categories.value = categories.value.filter((c) => c.id !== id);
    console.log(`Category ${id} deleted`);
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error);
  }
};

onMounted(() => fetchCategories());
</script>
