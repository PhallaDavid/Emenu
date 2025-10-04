<template>
  <div class="overflow-x-auto mt-4">
    <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Order ID
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Table
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Status
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Items
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Total Price
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Date
          </th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 text-sm text-gray-700">{{ order.id }}</td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ order.table_number }}
          </td>
          <td class="px-4 py-2">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-semibold',
                statusColor(order.status),
              ]"
            >
              {{ order.status }}
            </span>
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">
            <ul class="list-disc ml-5">
              <li v-for="item in order.items || []" :key="item.id">
                {{ item.product?.name || "N/A" }} × {{ item.quantity }} (${{
                  item.price
                }})
              </li>
            </ul>
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">
            ${{ order.total_price }}
          </td>
          <td class="px-4 py-2 text-sm text-gray-700">
            {{ formatDate(order.created_at) }}
          </td>
          <td class="px-4 py-2 text-sm text-gray-700 space-x-2">
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
              @click="printOrder(order)"
            >
              Print
            </button>
            <!-- <NuxtLink
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
              @click="editOrder(order)"
            >
              Edit
            </NuxtLink> -->
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
              @click="deleteOrder(order)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

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
        @click="fetchOrders(page)"
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

const orders = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const rowPerPage = 15;
const { $api } = useNuxtApp();

// Status badge colors
const statusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "canceled":
      return "bg-red-100 text-red-800";
    case "in progress":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Format date
const formatDate = (date) => {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";
};

// Fetch orders from API with pagination
const fetchOrders = async (page = 1) => {
  try {
    const response = await $api.get(
      `/orders?page=${page}&row_per_page=${rowPerPage}`
    );
    orders.value = response.data.data || [];
    currentPage.value = response.data.current_page || 1;
    lastPage.value = response.data.last_page || 1;
  } catch (err) {
    console.error("API error:", err);
    orders.value = [];
  }
};

// Pagination
const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    fetchOrders(currentPage.value);
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchOrders(currentPage.value);
  }
};

// Print order
const printOrder = (order) => {
  const logoUrl = "/images/kh1.PNG";
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
        ${(order.items || [])
          .map(
            (item) =>
              `<li>${item.product?.name || "N/A"} × ${item.quantity} ($${
                item.price
              })</li>`
          )
          .join("")}
      </ul>
      <p><strong>Total:</strong> $${order.total_price}</p>
      <p><strong>Date:</strong> ${formatDate(order.created_at)}</p>
    </div>
  `;
  const printWindow = window.open("", "", "width=600,height=800");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
};

// Edit / Delete placeholders
const editOrder = (order) => alert(`Edit order #${order.id}`);
const deleteOrder = (order) => alert(`Delete order #${order.id}`);

onMounted(() => {
  fetchOrders(currentPage.value);
});
</script>
