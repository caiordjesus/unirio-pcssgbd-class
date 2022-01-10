const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin(),
    ],
  },
}
