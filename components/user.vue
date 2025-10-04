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
            Email
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Role
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
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 text-sm text-gray-700">{{ user.id }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">{{ user.name }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">{{ user.email }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ user.role || "User" }}
          </td>
          <td class="px-4 py-2">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-semibold',
                statusColor(user.status),
              ]"
            >
              {{ user.status || "active" }}
            </span>
          </td>
          <td class="px-4 py-2 text-sm text-gray-700 space-x-2">
            <NuxtLink
              :to="`/settings/users/edit/${user.id}`"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
            >
              Edit
            </NuxtLink>

            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
              @click="deleteUser(user)"
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
        @click="fetchUsers(page)"
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

const users = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const perPage = 15;
const { $api } = useNuxtApp();

const statusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
const fetchUsers = async (page = 1) => {
  try {
    const res = await $api.get(`/users?page=${page}&row_per_page=${perPage}`);
    users.value = res.data.data || [];

    currentPage.value = res.data.current_page || 1;
    lastPage.value = res.data.last_page || 1;
  } catch (err) {
    console.error("API error:", err);
    users.value = [];
  }
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    fetchUsers(currentPage.value);
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchUsers(currentPage.value);
  }
};
const editUser = (user) => alert(`Edit user #${user.id}`);
const deleteUser = (user) => alert(`Delete user #${user.id}`);

onMounted(() => {
  fetchUsers(currentPage.value);
});
</script>
