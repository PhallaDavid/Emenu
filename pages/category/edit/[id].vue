<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Edit Category</h1>

        <NuxtLink to="/category" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
            ">
            Back
        </NuxtLink>

        <form @submit.prevent="updateCategory" class="space-y-4 max-w-lg" enctype="multipart/form-data">
            <!-- Name -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input v-model="form.name" type="text" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                 focus:border-blue-500"
                    placeholder="Enter category name" required />
            </div>

            <!-- Description -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea v-model="form.description" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                 focus:border-blue-500"
                    placeholder="Enter description"></textarea>
            </div>

            <!-- Parent Category (Optional) -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Parent Category ID</label>
                <input v-model="form.parent_id" type="number" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                 focus:border-blue-500"
                    placeholder="Enter parent ID or leave empty" />
            </div>

            <!-- Image Upload -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                <input type="file" @change="handleFileUpload" class="w-full p-2.5 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-blue-500 
                 focus:border-blue-500" />
                <div v-if="form.image_preview" class="mt-2">
                    <img :src="form.image_preview" class="h-16 rounded" />
                </div>
            </div>

            <!-- Submit -->
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center 
              ">
                Update
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const api = useNuxtApp().$api
const route = useRoute()

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
})

const form = ref({
    name: '',
    description: '',
    parent_id: null,
    image: null,
    image_preview: null
})

// Load category data by ID
onMounted(async () => {
    try {
        const { data } = await api.get(`/categories/${route.params.id}`)
        form.value.name = data.name
        form.value.description = data.description
        form.value.parent_id = data.parent_id
        form.value.image_preview = data.image
    } catch (error) {
        console.error('Error fetching category:', error)
    }
})

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.value.image = file
        form.value.image_preview = URL.createObjectURL(file) // preview
    }
}

const updateCategory = async () => {
    try {
        const payload = new FormData()
        payload.append('name', form.value.name)
        payload.append('description', form.value.description)
        if (form.value.parent_id) payload.append('parent_id', form.value.parent_id)
        if (form.value.image) payload.append('image', form.value.image)

        const { data } = await api.post(`/categories/${route.params.id}?_method=PUT`, payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        console.log('Updated:', data)
        navigateTo('/category')
    } catch (error) {
        console.error('Error updating category:', error.response?.data || error)
    }
}
</script>
