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
      swSrc: '../../public/worker.js',
    }
  },
  pluginOptions: {
    compression:{
      brotli: {
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          level: 11,
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  },
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  }
  };