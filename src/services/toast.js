import { isPlainObject, isNumber } from 'lodash'
import { createService } from './_utils'
import { default as Component } from '../components/Toast/Toast.vue'

export default Vue => {
  const getToast = (payload, duration) => {
    payload = isPlainObject(payload) ? payload : { message: payload }
    payload.duration = isNumber(duration) ? duration : payload.duration
    return createService({ Vue, Component })({
      ...payload,
      visible: true
    }, {
      default: payload.message
    })
  }
  getToast.success = (message, duration) => getToast({
    type: 'success',
    message,
    duration
  })
  getToast.error = (message, duration) => getToast({
    type: 'error',
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

