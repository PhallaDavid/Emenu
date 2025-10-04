<template>
  <div class="p-4 bg-white rounded-2xl shadow-md">
    <h2 class="text-xl font-bold mb-4">Product Sales</h2>

    <!-- Safe rendering -->
    <div v-if="chartData && chartData.labels.length">
      <client-only>
        <Line :data="chartData" :options="chartOptions" />
      </client-only>
    </div>
    <div v-else class="text-gray-500">Loading chart...</div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Line } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

// Chart data (reactive)
const chartData = reactive({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Product A',
      data: [120, 200, 150, 170, 220, 250],
      borderColor: '#3b82f6', 
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,  
    },
    {
      label: 'Product B',
      data: [80, 150, 100, 130, 180, 200],
      borderColor: '#10b981',           // Tailwind green-500
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
    },
  ],
})
const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    tooltip: { mode: 'index', intersect: false },
    title: { display: true, text: 'Monthly Product Sales', font: { size: 16 } }
  },
  scales: {
    y: { beginAtZero: true },
  },
})
</script>

<style scoped>
div {
  height: 300px;
}
</style>
