import { createService } from './_utils'
import { default as Component } from '../components/Dialog/Dialog.vue'

export default Vue => (attrs, children = {}, options = {}) => {
  return createService({ Vue, Component })({
    ...options,
    attrs: {
      ...attrs,
      type: 'confirm',
      visible: true
    }
  }, children)
}
