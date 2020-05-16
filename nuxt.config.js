
export default {
  mode: 'spa',

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

  loading: { color: '#fff' },

  css: [
  ],

  plugins: [
    {src: '~/services/firebase.js'}, {src: "~/plugins/fireauth.js"}, {src: '~/assets/pwa-check.js'}
  ],

  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.scss',
    exposeConfig: false
  },

  purgeCSS: {
    mode: 'postcss',
    enabled: (process.env.NODE_ENV === 'production')
  },

  modules: [
    '@nuxtjs/pwa',
  ],

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
