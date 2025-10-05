<template>
  <div class="p-4 flex flex-col">
    <form
      @submit.prevent="updateProfile"
      class="rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <!-- Name -->
      <div class="flex flex-col">
        <label class="block font-medium mb-1">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>

      <!-- Email -->
      <div class="flex flex-col">
        <label class="block font-medium mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>

      <!-- Address -->
      <div class="flex flex-col">
        <label class="block font-medium mb-1">Address</label>
        <input
          v-model="form.address"
          type="text"
          class="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <!-- Phone -->
      <div class="flex flex-col">
        <label class="block font-medium mb-1">Phone</label>
        <input
          v-model="form.phonenumber"
          type="text"
          class="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <!-- Profile Picture -->
      <div class="flex flex-col">
        <label class="block font-medium mb-1">Profile Picture</label>
        <input type="file" @change="handleFileChange" class="w-full" />
        <div v-if="previewImage" class="mt-2">
          <img :src="previewImage" class="w-24 h-24 rounded-full" />
        </div>
      </div>

      <!-- Status -->
      <div class="flex flex-col">
        <label class="block font-medium mb-1">Status</label>
        <select
          v-model="form.status"
          class="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="md:col-span-2">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-sm"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const api = useNuxtApp().$api;
const user = useState("user", () => null);

const form = ref({
  name: "",
  email: "",
  address: "",
  phonenumber: "",
  status: "active",
  profile_picture: null,
});

const previewImage = ref(null);

// Load profile on mount
onMounted(async () => {
  try {
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");
    if (!token) return;

    const { data } = await api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    user.value = data.user;

    // Fill form
    form.value = { ...data.user };
    previewImage.value = data.user.profile_picture;
  } catch (err) {
    console.error("Profile fetch error:", err);
  }
});

// Handle profile picture change
const handleFileChange = (e) => {
  const file = e.target.files[0];
  form.value.profile_picture = file;
  previewImage.value = URL.createObjectURL(file);
};

// Update profile
const updateProfile = async () => {
  try {
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");
    const formData = new FormData();

    for (const key in form.value) {
      if (form.value[key] !== null) {
        formData.append(key, form.value[key]);
      }
    }

    const { data } = await api.post("/profile/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    user.value = data.user; // update global state
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Update error:", err);
  }
};

definePageMeta({
  layout: "dashboard",
});
</script>
