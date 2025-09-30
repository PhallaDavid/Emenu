<template>
  <div class="flex items-center space-x-2">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      @click="switchLocale(locale.code)"
      :class="[
        'px-3 py-1 rounded text-sm font-medium transition-colors',
        $i18n.locale === locale.code
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<script setup>
const { $i18n } = useNuxtApp()

const availableLocales = [
  { code: 'en', name: 'EN' },
  { code: 'kh', name: 'KH' }
]

function switchLocale(locale) {
  $i18n.setLocale(locale)
}
</script>
