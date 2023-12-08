// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: [
    '@vee-validate/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt'
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage'
    }
  }

})
