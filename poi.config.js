const path = require('path')

const resolveRoot = path.resolve.bind(path, __dirname)

module.exports = {
  entry: 'demo/index.js',
  babel: {
    jsx: 'vue'
  },
  html: {
    template: resolveRoot('demo/index.html')
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude
      .add(/Icon.icons/)

    config.module
      .rule('svg-to-symbol')
      .include
      .add(/Icon.icons/)
      .end()
      .test(/\.svg$/)
      .use('svg-to-symbol-loader')
      .loader('svg-to-symbol-loader')
  }
}
