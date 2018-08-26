const path = require('path')
const { kebabCase } = require('lodash')

const resolveRoot = path.resolve.bind(path, __dirname)

module.exports = {
  chainWebpack: config => {
    // export default
    config.output.libraryExport('default')

    // SVG
    const SVGRule = config.module.rule('svg')
    SVGRule.uses.clear()
    SVGRule
      .use('svg-to-symbol-loader')
      .loader('svg-to-symbol-loader')
      .options({
        extractId({ name }) {
          return `l-${name}`
        }
      })

    if (process.env.NODE_ENV !== 'production') {
      // HTML
      config
        .plugin('html')
        .tap(args => {
          args[0].template = resolveRoot('demo/index.html')
          return args
        })
    }
  },
  css: {
    loaderOptions: {
      css: {
        getLocalIdent: ({ resourcePath }, _, localName) => {
          let { name } = path.parse(resourcePath)
          name = name.replace(/\.module$/, '')
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
