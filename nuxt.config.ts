// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "en", name: "English", iso: "en-US" },
          { code: "kh", name: "Khmer", iso: "km-KH" },
        ],
        defaultLocale: "en",
        strategy: "no_prefix",
        silentFallbackWarn: true,
        silentTranslationWarn: true,
        detectBrowserLanguage: false,
      },
    ],
  ],
  css: ["~/assets/css/main.css"],
});
