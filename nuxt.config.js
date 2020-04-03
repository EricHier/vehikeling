
export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'vehikeling | Verwaltung für die Services deiner Fahrzeuge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Die Vehikel-Servecing App für deine Sportwagen, Oldtimer oder Motorräder - ganz unkompliziert die Services wie Ölwechsel und HU verwalten. Probiere es aus!' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  pwa: {
    meta: {
      name: "vehikeling",
      nativeUI: true
    },
    manifest: {
      lang: 'de',
      name: "vehikeling",
      short_name: "vehikeling",
      background_color: "#fafafa",
      start_url: "/cars",
      display: "standalone",
      theme_color: "#fafafa"
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    "~/css/main.css",
    "~/assets/sass/index.scss",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/services/firebase.js'}, {src: "~/plugins/fireauth.js"}, {src: '~/assets/pwa-check.js'}
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/pwa',
  ],

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    // eslint-disable-next-line no-unused-vars
    extend (config, ctx) {
    }
  }
}
