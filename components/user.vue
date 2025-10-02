<template>
  <div class="flex flex-col p-2">
    <div class="flex flex-row justify-between p-2">
      <div class="text-lg text-gray-800 mb-1">Dashboard</div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto mt-4">
      <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm text-gray-700">{{ user.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ user.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ user.email }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ user.role }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">
              <button class="text-blue-600 hover:underline mr-2">Edit</button>
              <button class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' },
]
</script>
