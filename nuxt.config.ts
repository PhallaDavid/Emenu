// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/i18n',
      {
        locales: [
          { code: 'en', name: 'English', iso: 'en-US' },
          { code: 'kh', name: 'Khmer', iso: 'km-KH' }
        ],
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',
          alwaysRedirect: false,
          fallbackLocale: 'en'
        }
      }
    ]
  ],
  css: ['~/assets/css/main.css']
})
