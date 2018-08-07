const snakeCase = require('lodash/snakeCase')

module.exports = {
  presets: [
    ['poi', {
      jsx: 'vue'
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
    }, 'date-fns']
  ]
}
