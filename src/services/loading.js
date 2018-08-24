import { createService } from './_utils'
import { default as Component } from '../components/Toast/Toast.vue'

export default Vue => message => {
  return createService({ Vue, Component })({
    visible: true,
    type: 'loading'
  }, {
    default: message
  })
}
