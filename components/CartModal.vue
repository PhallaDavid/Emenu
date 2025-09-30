<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="$emit('close')"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative" @click.stop>
      <h2 class="text-2xl font-bold mb-4">{{ $t("yourCart") }}</h2>
      <div v-if="cart.length === 0" class="text-center py-8 text-gray-500">
        {{ $t("cartEmpty") }}
        <img
          src="/static/images/empty-cart.png"
          class="w-24 h-24 flex items-center mx-auto"
          alt=""
        />
      </div>
      <div v-else class="space-y-4 max-h-64 overflow-y-auto">
        <div
          v-for="(item, index) in cart"
          :key="index"
          class="flex items-center space-x-4 border-b pb-4"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="h-16 w-16 object-cover rounded"
          />
          <div class="flex-1">
            <div class="font-semibold">{{ item.name }}</div>
            <div class="text-green-600">${{ item.price }}</div>
          </div>
          <button
            @click="$emit('remove', index)"
            class="text-red-500 hover:text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
        </div>
      </div>
      <div v-if="cart.length > 0" class="mt-4 pt-4 border-t">
        <div class="flex justify-between text-lg font-bold">
          <span>{{ $t("total") }}</span>
          <span
            >${{
              cart
                .reduce((sum, item) => sum + parseFloat(item.price), 0)
                .toFixed(2)
            }}</span
          >
        </div>
        <button
          @click="$emit('checkout')"
          class="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {{ $t("checkout") }}
        </button>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "CartModal",
  emits: ["close", "remove", "checkout"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
};
</script>
