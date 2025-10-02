<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 relative"
      @click.stop
    >
      <h2 class="text-xl font-bold mb-4">Table</h2>

      <input
        v-model="tableNumber"
        type="text"
        placeholder="Enter table number"
        class="w-full px-4 py-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
        :disabled="loading"
      />
      <button
        @click="confirmTable"
        class="w-full bg-gray-800 text-white px-4 py-2 rounded-full font-semibold transition-colors flex items-center justify-center"
        :class="{ 'opacity-70 cursor-not-allowed': loading }"
        :disabled="loading"
      >
        <span v-if="!loading">Confirm</span>
        <span v-else class="flex items-center gap-2">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="2"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableSelectModal",
  props: {
    show: { type: Boolean, required: true },
  },
  emits: ["confirm"],
  data() {
    return {
      tableNumber: "",
      loading: false,
    };
  },
  methods: {
    async confirmTable() {
      if (this.tableNumber.trim() !== "") {
        this.loading = true;

        // simulate API or delay
        setTimeout(() => {
          this.$emit("confirm", this.tableNumber);
          this.loading = false;
        }, 1500);
      } else {
        alert("Please enter a table number.");
      }
    },
  },
};
</script>
