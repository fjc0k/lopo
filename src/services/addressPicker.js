import { createService } from './_utils'
import { default as Component } from '../components/AddressPicker/AddressPicker.vue'

export default Vue => (attrs, children = {}, options = {}) => {
  return createService({ Vue, Component })({
    ...options,
    attrs: {
      ...attrs,
      visible: true
    }
  }, children)
}