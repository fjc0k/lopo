import { createService } from './_utils'
import { default as Component } from '../components/Toast/Toast.vue'

export default Vue => (message, delay = 0) => {
  const createLoading = () => {
    return createService({ Vue, Component })(
      {
        maskThrough: false,
        visible: true,
        type: 'loading'
      },
      {
        default: message
      }
    )
  }
  if (delay <= 0) {
    return createLoading()
  }
  let loading
  const timer = setTimeout(() => {
    loading = createLoading()
  }, delay)
  return Promise.resolve({
    hide() {
      clearTimeout(timer)
      loading && loading.then(loading => loading.hide())
    }
  })
}
