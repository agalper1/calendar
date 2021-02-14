module.exports = {
  css: {
    loaderOptions: {
        sass: {
          additionalData: `
              @import "../../styles/main.scss";
            `
        }
    }
  },
  pwa: {
    name: 'Kalender App',
    background_color: "purple",
    description: "Web App für das Management von Online Meetings",
    display: "fullscreen",
    icons: [
      {
        src: "assets/logo.png",
        sizes: "192x192",
        type: "image/png"
      }
    ],
    short_name: "Calendar",
    start_url: "/",
    themeColor: '#6876DF',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: '../../src/registerServiceWorker.js',
    }
  }
  };