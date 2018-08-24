import { isPlainObject } from 'lodash'
import { createService } from './_utils'
import { default as Component } from '../components/Image/ImageViewer.vue'

export default Vue => (data, options = {}) => {
  if (isPlainObject(data)) {
    options = data
  } else {
    options.data = data
  }
  return createService({ Vue, Component })({
    ...options,
    visible: true
  })
}
