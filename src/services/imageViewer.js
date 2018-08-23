import { isPlainObject } from 'lodash'
import { createService } from './_utils'
import { default as Component } from '../components/Image/ImageViewer.vue'

export default Vue => (data, attrs = {}) => {
  if (isPlainObject(data)) {
    attrs = data
  } else {
    attrs.data = data
  }
  return createService({ Vue, Component })({
    attrs: {
      ...attrs,
      visible: true
    }
  })
}
