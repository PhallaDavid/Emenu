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
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>

      <!-- Product content -->
      <div class="flex flex-col md:flex-row gap-4">
        <img
          v-if="product.image_url"
          :src="product.image_url"
          :alt="product.name"
          class="w-full md:w-48 h-60 object-cover rounded"
        />

        <div class="flex flex-row justify-between w-full md:pl-4">
          <div class="flex flex-col justify-start gap-1">
            <div class="text-lg text-gray-800 mb-1">{{ product.name }}</div>
            <div class="text-lg text-gray-800 mb-3">${{ product.price }}</div>
          </div>
          <div class="flex flex-row self-end justify-end">
            <button
              @click="$emit('add-to-cart', product)"
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <font-awesome-icon :icon="['fas', 'shopping-cart']" />Add to Cart
            </button>
          </div>
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
