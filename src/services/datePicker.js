import { createService } from './_utils'
import { default as Component } from '../components/Picker/DatePicker.vue'

export default Vue => (options, children = {}) => {
  return createService({ Vue, Component })({
    ...options,
    visible: true
  }, children)
}
