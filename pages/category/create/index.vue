<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Create Category</h1>

        <NuxtLink to="/category" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
              ">
            Back
        </NuxtLink>

        <form @submit.prevent="createCategory" class="space-y-4 max-w-lg" enctype="multipart/form-data">
            <!-- Name -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input v-model="form.name" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  "
                    placeholder="Enter category name" required />
            </div>

            <!-- Description -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea v-model="form.description" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  "
                    placeholder="Enter description"></textarea>
            </div>

            <!-- Parent Category (Optional) -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Parent Category ID</label>
                <input v-model="form.parent_id" type="number" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  "
                    placeholder="Enter parent ID or leave empty" />
            </div>

            <!-- Image Upload -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                <input type="file" @change="handleFileUpload" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                   focus:border-blue-500  " />
            </div>

            <!-- Submit -->
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
             ">
                Create
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const api = useNuxtApp().$api

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
})

const form = ref({
    name: '',
    description: '',
    parent_id: null,
    image: null
})

const handleFileUpload = (event) => {
    form.value.image = event.target.files[0]  // store the file
}

const createCategory = async () => {
    try {
        // build FormData for file upload
        const payload = new FormData()
        payload.append('name', form.value.name)
        payload.append('description', form.value.description)
        if (form.value.parent_id) {
            payload.append('parent_id', form.value.parent_id)
        }
        if (form.value.image) {
            payload.append('image', form.value.image)
        }

        const { data } = await api.post('/categories', payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        console.log('Created:', data)
        navigateTo('/category')
    } catch (error) {
        console.error('Error creating category:', error.response?.data || error)
    }
}
</script>
