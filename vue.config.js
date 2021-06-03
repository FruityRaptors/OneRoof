module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },

  // THIS IS THE PWA MANIFEST. DETAILS HERE: https://web.dev/add-manifest/
  // We might need to make sure we have a valid apple touch icon, below
  pwa: {
    manifestOptions: {
      name: "OneRoof",
      // Is this path correct?
      start_url: "./yourhome",
      display: "standalone",
      theme_color: "#000000",
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "./img/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./img/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    },

    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      maskicon: null,
      favicon32: "./favicon32.png",
      favicon16: "./favicon16.png",
      appleTouchIcon: null,
      msTileImage: null,
    },
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
  },

  transpileDependencies: [
    'vuetify'
  ]
};
