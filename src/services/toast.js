import { createService } from './_utils'
import { default as Component } from '../components/Toast/Toast.vue'

export default Vue => {
  const getToast = (payload, duration) => {
    let attrs
    let message
    if (payload && typeof payload === 'object') {
      attrs = payload
      message = payload.message
    } else {
      attrs = { duration }
      message = payload
    }
    return createService({ Vue, Component })({
      attrs: {
        visible: true,
        ...attrs
      }
    }, {
      default: message
    })
  }
  getToast.success = (message, duration) => getToast({
    type: 'success',
    message,
    duration
  })
  getToast.fail = (message, duration) => getToast({
    type: 'fail',
    message,
    duration
  })
  getToast.loading = message => getToast({
    type: 'loading',
    message
  })
  getToast.top = (message, duration) => getToast({
    position: 'top',
    message,
    duration
  })
  getToast.center = (message, duration) => getToast({
    position: 'center',
    message,
    duration
  })
  getToast.bottom = (message, duration) => getToast({
    position: 'bottom',
    message,
    duration
  })
  return getToast
}

