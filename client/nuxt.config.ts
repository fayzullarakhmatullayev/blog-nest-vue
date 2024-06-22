// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    '~/assets/scss/main.scss',
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primeicons/primeicons.css'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },
  modules: ['nuxt-primevue', '@pinia/nuxt'],
  primevue: {
    components: {
      include: ['Button', 'TabPanel', 'TabView']
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL
    }
  }
});
