import { createService } from './_utils'
import { default as Component } from '../components/Toast/Toast.vue'

export default Vue => message => {
  return createService({ Vue, Component })({
    attrs: {
      visible: true,
      type: 'loading'
    }
  }, [
    message
  ])
}
