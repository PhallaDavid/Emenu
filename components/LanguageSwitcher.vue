<template>
  <div class="flex items-center space-x-2">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      @click="switchLocale(locale.code)"
      :class="[
        'bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800',
        $i18n.locale === locale.code
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<script setup>
const { $i18n } = useNuxtApp();

const availableLocales = [
  { code: "en", name: "EN" },
  { code: "kh", name: "KH" },
];

function switchLocale(locale) {
  $i18n.setLocale(locale);
}
</script>
