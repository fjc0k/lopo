import { createService } from './_utils'
import { default as Component } from '../components/Dialog/Dialog.vue'

export default Vue => (options, children = {}) => {
  return createService({ Vue, Component })({
    ...options,
    type: 'prompt',
    visible: true
  }, children)
}
