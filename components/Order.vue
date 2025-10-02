<template>
    <div class="overflow-x-auto mt-4">
        <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Table</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Items</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Price</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                    <td class="px-4 py-2 text-sm text-gray-700">{{ order.id }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700">{{ order.table_number }}</td>
                    <td class="px-4 py-2">
                        <span :class="[
                            'px-2 py-1 rounded-full text-xs font-semibold',
                            statusColor(order.status)
                        ]">
                            {{ order.status }}
                        </span>
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-700">
                        <ul class="list-disc ml-5">
                            <li v-for="item in order.items" :key="item.id">
                                {{ item.product.name }} × {{ item.quantity }} (${{ item.price }})
                            </li>
                        </ul>
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-700">${{ order.total_price }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700">{{ formatDate(order.created_at) }}</td>
                    <td class="px-4 py-2 text-sm text-gray-700 space-x-2">
                        <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                            @click="printOrder(order)">
                            Print
                        </button>
                        <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                            @click="editOrder(order)">
                            Edit
                        </button>
                        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                            @click="deleteOrder(order)">
                            Delete
                        </button>
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

const statusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800'
        case 'completed':
            return 'bg-green-100 text-green-800'
        case 'canceled':
            return 'bg-red-100 text-red-800'
        case 'in progress':
            return 'bg-blue-100 text-blue-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
const printOrder = (order) => {
  const logoUrl = '/images/kh1.PNG'

  const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Logo" style="max-width: 150px; margin-bottom: 10px;" />
        <h1 style="margin: 0; font-size: 24px;">Order Receipt</h1>
      </div>

      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Table:</strong> ${order.table_number}</p>
      <p><strong>Status:</strong> ${order.status}</p>

      <h3>Items:</h3>
      <ul>
        ${order.items.map(item => `<li>${item.product.name} × ${item.quantity} ($${item.price})</li>`).join('')}
      </ul>

      <p><strong>Total:</strong> $${order.total_price}</p>
      <p><strong>Date:</strong> ${formatDate(order.created_at)}</p>
    </div>
  `

  const printWindow = window.open('', '', 'width=600,height=800')
  printWindow.document.write(printContent)
  printWindow.document.close()
  printWindow.print()
}


const editOrder = (order) => {
    alert(`Edit order #${order.id} - implement your edit logic here`)
}

const deleteOrder = (order) => {
    alert(`Delete order #${order.id} - implement your delete logic here`)
}

onMounted(async () => {
    try {
        const response = await $api.get('/orders')
        orders.value = response.data
    } catch (err) {
        console.error('API error:', err)
    }
})
</script>
