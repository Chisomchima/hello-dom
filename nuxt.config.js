export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'server',

  // loading: '~/components/LoadingBar.vue',

  loading: {
    color: '#1070b7',
    throttle: 0,
    height: '3px',
    continuous: true
  },

  // Global Transition (default)
  pageTransition: 'slide-bottom',

  // router: {
  //   middleware: 'global_middleware'
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SlateMD',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/2.0.0-alpha.2/cropper.min.css',
      },
      {
        href: 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css',
        rel: 'stylesheet',
      },
    ],

    script: [
      {
        src: '/js/scripts.js',
      },
      // <!-- JQuery 3.5.1 and Bootstrap 4.6.0 -->
      {
        src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
        integrity:
          'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj',
        crossorigin: 'anonymous',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js',
        integrity:
          'sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns',
        crossorigin: 'anonymous',
      },
      // <!-- Iconify  -->

      {
        src: 'https://code.iconify.design/1/1.0.6/iconify.min.js',
      },
    ],
  },
  // server: {
  //   host: '0', // default: localhost
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/all.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/iziToast',
    '~/plugins/vue-socket',
    '~/plugins/axios',
    '~/plugins/v-tooltip',
    '~/plugins/prime-vue',
    '~/plugins/vee-validate',
    '~/plugins/clipboard',
    '~/plugins/calender',
    '~/plugins/dateFormat',
    '~/plugins/wrapEmail',

    '~/plugins/persistedState.client.js',
    '~/plugins/bootstrap-icon.js',
    '~/plugins/vue-select.js',
    '~/plugins/vue-swatches',
    '~/plugins/iconify.js',
    '~/plugins/audioRecorder.js',

    '~/plugins/vue-gates.js',
    '~/plugins/formFunc.global.js',
    '~/plugins/modalMsgMixin.global.js',

    '~/plugins/loading-brain.js',

    '~/plugins/dexie.js',
    '~/plugins/vueInput.js',
    '~/plugins/highchart.js',

    '~/plugins/api.js',
    // '~/plugins/gleap.js'
    // {
    //   src: '~/plugins/socket-client.js',
    //   ssr: false,                    // <-- this line is required
    // },
  ],
  // serverMiddleware: ['~/middleware/redirects.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/dotenv
    '@nuxtjs/dotenv',
    'vue2-editor/nuxt',
    '@nuxtjs/style-resources'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  // Build Configuration: https://go.nuxtjs.dev/config-build
    extend(config, _ctx) {
      config.module.rules.push({
        test: /\.worker\.js$/i,
        loader: 'comlink-loader',
        options: {
          singleton: true,
        },
      })
    },
  },

  workbox: {
    preCaching: ['/error404.png', '/networkerror.svg'],
  },

  styleResources: {
    scss: [
      '~/assets/css/_variable.scss',
    ],
    hoistUseStatements: true  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  }
}
