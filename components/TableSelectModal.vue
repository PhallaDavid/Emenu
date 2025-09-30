<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative"
      @click.stop
    >
      <h2 class="text-xl font-bold mb-4">Select Your Table</h2>

      <input
        v-model="tableNumber"
        type="text"
        placeholder="Enter table number"
        class="w-full px-4 py-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
      />

      <button
        @click="confirmTable"
        class="w-full bg-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors"
      >
        Confirm
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
    };
  },
  methods: {
    confirmTable() {
      if (this.tableNumber.trim() !== "") {
        this.$emit("confirm", this.tableNumber);
      } else {
        alert("Please enter a table number.");
      }
    },
  },
};
</script>
