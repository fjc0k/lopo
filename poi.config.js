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
  css: {
    modules: true
  }
}
