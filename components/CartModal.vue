<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="$emit('close')">
    <div class="bg-white rounded-3xl   p-6 max-w-md w-full mx-4 relative" @click.stop>
      <!-- Header -->
      <h2 class="text-2xl font-bold mb-4">
        {{ isPayment ? $t("Payment") : $t("yourCart") }}
      </h2>

      <!-- Cart View -->
      <div v-if="!isPayment">
        <!-- Empty Cart -->
        <div v-if="cart.length === 0" class="text-center py-8 text-gray-500">
          {{ $t("cartEmpty") }}
          <img src="/images/empty-cart.png" class="w-24 h-24 flex items-center mx-auto" alt="" />
        </div>

        <!-- Cart Items -->
        <div v-else class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="(item, index) in cart" :key="index" class="flex items-center space-x-4 border-b pb-4">
            <img :src="item.image_url || '/images/coffee.jpg'" :alt="item.name"
              class="h-16 w-16 object-cover rounded-lg" />
            <div class="flex-1">
              <div class="text-xs text-gray-800 mb-1">{{ item.name }}</div>
              <div class="text-xs text-gray-800 mb-3">${{ item.price }}</div>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center space-x-2">
              <button @click="$emit('decrease', index)" :disabled="item.quantity <= 1"
                class="bg-gray-200 text-gray-800 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                <font-awesome-icon :icon="['fas', 'minus']" />
              </button>
              <span class="font-semibold text-xs px-2">{{ item.quantity }}</span>
              <button @click="$emit('increase', index)" class="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
            </div>

            <!-- Remove Button -->
            <button @click="$emit('remove', index)"
              class="text-red-500 px-2 py-2 hover:bg-gray-50 rounded-full hover:text-red-700">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>


        <!-- Total & Checkout -->
        <div v-if="cart.length > 0" class="mt-4 pt-4 border-t">
          <div class="flex justify-end gap-2 text-lg font-bold">
            <span>{{ $t("total") }}:</span>
            <span>${{ cartTotal }}</span>
          </div>
          <div class="flex justify-end pt-2">
            <button @click="handleCheckout"
              class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold border-2 border-gray-800 hover:bg-gray-200 transition-colors flex items-center gap-2"
              :disabled="loading">
              <span v-if="!loading" class="flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'credit-card']" />
                {{ $t("checkout") }}
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                {{ $t("Processing...") }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Payment View -->
      <div v-else>
        <p class="text-lg text-gray-500 pb-4">
          {{ $t("Select your payment method") }}
        </p>

        <div class="flex flex-col gap-4">
          <div v-for="method in paymentMethods" :key="method.value" @click="paymentMethod = method.value" :class="[
            'flex flex-row items-center gap-4 p-4 rounded-lg cursor-pointer transition border-2',
            paymentMethod === method.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400',
          ]">
            <font-awesome-icon :icon="method.icon" class="w-10 h-10 text-gray-700" />
            <span class="text-lg text-gray-800">{{ method.label }}</span>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button @click="handleOrder"
            class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold border-2 border-gray-800 hover:bg-gray-200 transition-colors flex items-center gap-2"
            :disabled="loading">
            <span v-if="!loading" class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'receipt']" class="w-6 h-6 text-gray-700" />
              {{ $t("Order Now") }}
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              {{ $t("Processing...") }}
            </span>
          </button>
        </div>
      </div>

      <!-- Close Button -->
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartModal",
  emits: [
    "close",
    "remove",
    "decrease",
    "increase",
    "checkout-confirm",
    "orderCreated",
  ],
  props: {
    show: { type: Boolean, required: true },
    cart: { type: Array, required: true },
  },
  data() {
    return {
      isPayment: false,
      paymentMethod: "cash",
      loading: false, // new
    };
  },
  computed: {
    cartTotal() {
      return this.cart
        .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2);
    },
    paymentMethods() {
      return [
        { label: this.$t("Cash"), value: "cash", icon: ["fas", "money-bill"] },
        {
          label: this.$t("Delivery"),
          value: "delivery",
          icon: ["fas", "truck"],
        },
      ];
    },
  },
  methods: {
    handleCheckout() {
      this.loading = true;
      setTimeout(() => {
        this.isPayment = true;
        this.loading = false;
      }, 1000);
    },
    handleOrder() {
      if (!this.paymentMethod) return;
      this.loading = true;
      setTimeout(() => {
        this.$emit("checkout-confirm", this.paymentMethod);
        this.isPayment = false;
        this.paymentMethod = "cash";
        this.loading = false;
      }, 1500);
    },
  },
};
</script>
