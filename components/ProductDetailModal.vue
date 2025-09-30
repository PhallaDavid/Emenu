<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="$emit('close')"
  >
    <div
      class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative"
      @click.stop
    >
      <!-- Close button -->
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Product content -->
      <div class="flex flex-col md:flex-row gap-4">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full md:w-48 h-48 object-cover rounded"
        />
        <div class="flex-1">
          <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
          <div class="text-green-600 font-semibold text-xl mb-4">
            ${{ product.price }}
          </div>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>

          <button
            @click="$emit('add-to-cart', product)"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["close", "add-to-cart"],
};
</script>
