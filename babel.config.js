const snakeCase = require('lodash/snakeCase')

module.exports = {
  presets: [
    ['@vue/app', {
      loose: true
    }]
  ],
  plugins: [
    ['import', {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false
    }, 'lodash'],
    ['import', {
      libraryName: 'date-fns',
      customName: name => `date-fns/${snakeCase(name)}`
    }, 'date-fns'],
    ['import', {
      libraryName: 'ant-design-icons',
      customName: name => `ant-design-icons/dist/standalone/svg/${name}.svg`
    }, 'ant-design-icons']
  ]
}
