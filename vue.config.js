module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://localhost:8080",
        secure: false,
      },
    },
  },

  configureWebpack: {
    devServer: {
      historyApiFallback: true,
    },
  },

  // THIS IS THE PWA MANIFEST. DETAILS HERE: https://web.dev/add-manifest/
  // We might need to make sure we have a valid apple touch icon, below
  pwa: {
    manifestOptions: {
      short_name: "OneRoof",
      name: "OneRoof: An app for managing households",
      // Is this path correct?
      start_url: "./yourhome",
      background_color: "#FFF3E0",
      display: "standalone",
      theme_color: "#FFF3E0",
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "./img/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "./img/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },

    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      maskicon: null,
      favicon32: "./img/icons/favicon-32x32.png",
      favicon16: "./img/icons/favicon-16x16.png", 
      appleTouchIcon: null,
      msTileImage: null,
    },
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
  },

  transpileDependencies: ["vuetify"],
};
