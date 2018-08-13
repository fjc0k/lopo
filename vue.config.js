const path = require('path')

const resolveRoot = path.resolve.bind(path, __dirname)

module.exports = {
  chainWebpack: config => {
    // SVG
    const SVGRule = config.module.rule('svg')
    SVGRule.uses.clear()
    SVGRule
      .use('svg-to-symbol-loader')
      .loader('svg-to-symbol-loader')

    // HTML
    config
      .plugin('html')
      .tap(args => {
        args[0].template = resolveRoot('demo/index.html')
        return args
      })
  }
}
