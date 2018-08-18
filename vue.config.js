const path = require('path')
const { kebabCase } = require('lodash')

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
  },
  css: {
    loaderOptions: {
      css: {
        camelCase: 'only',
        getLocalIdent: ({ resourcePath }, _, localName) => {
          let { name } = path.parse(resourcePath)
          name = kebabCase(name)
          localName = kebabCase(localName)
          return [
            'l',
            name,
            name === localName ? '' : localName
          ].filter(v => !!v).join('-')
        }
      }
    }
  }
}
