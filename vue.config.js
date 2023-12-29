const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/style/app.scss"`,
      },
    },
  },
  devServer: {
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "*",
    // },
    proxy: {
      "^/api": {
        target: "http://192.168.20.161:5001/engine-monitoring",
        https: true,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
      },
      "^/service-percolator": {
        target: "http://192.168.20.161:8322/percolator-rta",
        https: true,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/service-percolator": "/" },
      },
      "^/service-alert": {
        target: "http://192.168.20.223:8979/alert",
        https: true,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/service-alert": "/" },
      },
    },
  },
});
