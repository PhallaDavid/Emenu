<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Create User</h1>

    <!-- Back Button -->
    <NuxtLink to="/settings/users" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
               ">
      Back
    </NuxtLink>

    <!-- Success / Error Messages -->
    <div v-if="successMessage" class="bg-green-100 text-green-800 p-2 rounded mb-4">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="bg-red-100 text-red-800 p-2 rounded mb-4">
      {{ errorMessage }}
    </div>

    <!-- User Form -->
    <form @submit.prevent="createUser" class="space-y-4 max-w-lg bg-white p-6 rounded shadow">
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
          <input v-model="form.name" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " required />
        </div>

        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
          <input v-model="form.email" type="email" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " required />
        </div>
      </div>
      <div class="flex flex-col sm:flex-col md:flex-row md:space-x-6">
        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
          <input v-model="form.password" type="password" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " required />
        </div>

        <div class="flex-1">
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
          <input v-model="form.password_confirmation" type="password" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " required />
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
               ">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "auth", // ensure user is logged in
});

const { $api } = useNuxtApp();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errorMessage = ref("");
const successMessage = ref("");

const createUser = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const res = await $api.post("/register", form.value);
    successMessage.value = "User created successfully!";
    // Reset form
    form.value = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  } catch (err) {
    console.error(err);
    errorMessage.value =
      err.response?.data?.message || "Failed to create user.";
  }
};
</script>

<style scoped></style>
