<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="$emit('close')">
    <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative" @click.stop>
      <!-- Close button -->
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>

      <!-- Product content -->
      <div class="flex flex-col md:flex-row gap-4">
        <img :src="product.image_url || '/images/coffee.jpg'" :alt="product.name"
          class="w-full md:w-48 h-60 object-cover rounded" />

        <div class="flex flex-col justify-between w-full md:pl-4">
          <div>
            <div class=" flex flex-row justify-between ">
              <div class="text-lg text-gray-800 mb-1">{{ product.name }}</div>
              <div class="text-lg text-gray-800 mb-3">${{ product.price }}</div>

            </div>
            <div class="text-gray-600 mb-4">{{ product.description }}</div>
          </div>

          <div class="flex justify-end">
            <button @click="handleAddToCart"
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 flex items-center justify-center gap-2 w-36 whitespace-nowrap"
              :class="{ 'opacity-70 cursor-not-allowed': loading }" :disabled="loading">
              <span v-if="!loading" class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'shopping-cart']" />
                Add to Cart
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Add to Cart
              </span>
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
    show: { type: Boolean, required: true },
    product: { type: Object, default: () => ({}) },
  },
  emits: ["close", "add-to-cart"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleAddToCart() {
      if (!this.product.id) return;

      this.loading = true;
      setTimeout(() => {
        this.$emit("add-to-cart", this.product);
        this.loading = false;
      }, 1500);
    },
  },
};
</script>
