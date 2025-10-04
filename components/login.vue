<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 min-h-screen"
            @click.self="$emit('close')">
            <div class="relative bg-white p-6 rounded-xl w-96 max-w-full mx-4 shadow-lg">
                <!-- Close Button -->
                <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-800" @click="$emit('close')">
                    ✖
                </button>

                <!-- Modal Content -->
                <h2 class="text-2xl font-bold mb-4 text-gray-800 text-center">Login</h2>
                <img src="/images/kh1.PNG" class="rounded-full w-24 h-24 mx-auto mb-4" alt="Logo" />

                <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
                    <label class="flex items-center gap-2 text-gray-700">
                        <font-awesome-icon :icon="['fas', 'envelope']" /> Email
                    </label>
                    <input v-model="email" type="text" placeholder="Email"
                        class="border p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                    <label class="flex items-center gap-2 text-gray-700">
                        <font-awesome-icon :icon="['fas', 'lock']" /> Password
                    </label>
                    <input v-model="password" type="password" placeholder="Password"
                        class="border p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                    <button type="submit"
                        class="bg-blue-600 text-white w-full px-4 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
                        :disabled="loading">
                        <span v-if="!loading" class="flex items-center gap-2 justify-center w-full">
                            <font-awesome-icon :icon="['fas', 'user']" />
                            Login
                        </span>
                        <span v-else class="flex items-center gap-2 justify-center w-full">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="2"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                                </path>
                            </svg>
                            Loading...
                        </span>
                    </button>
                </form>

                <p v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">{{ errorMessage }}</p>
            </div>
        </div>
    </transition>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useNuxtApp, useCookie } from '#imports'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])
const nuxtApp = useNuxtApp()
const $api = nuxtApp.$api
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
    loading.value = true
    errorMessage.value = ''

    try {
        const response = await $api.post('/login', {
            email: email.value,
            password: password.value,
        })
        localStorage.setItem('token', response.data.access_token)
        const tokenCookie = useCookie('access_token')
        tokenCookie.value = response.data.access_token
        const user = useState('user', () => null)
        user.value = response.data.user
        localStorage.setItem('user', JSON.stringify(response.data.user))

        await router.push('/dashboard')
        emit('close')
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message || 'Login failed. Please try again.'
    } finally {
        loading.value = false
    }
}

</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
