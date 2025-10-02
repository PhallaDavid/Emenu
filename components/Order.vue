<template>
    <div class="overflow-x-auto mt-4">
        <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Table</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Price</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Items</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                    <td class="px-4 py-2 text-sm text-gray-700">{{ order.id }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700">{{ order.table_number }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 capitalize">{{ order.status }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700">${{ order.total_price }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700">
                        <ul class="list-disc ml-5">
                            <li v-for="item in order.items" :key="item.id">
                                {{ item.product.name }} × {{ item.quantity }} (${{ item.price }})
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])
const { $api } = useNuxtApp();
onMounted(async () => {
    try {
        const response = await $api.get('/orders') // adjust API path
        orders.value = response.data
    } catch (err) {
        console.error('API error:', err)
    }
})
</script>
