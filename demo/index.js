import Vue from 'vue'
import Lopo from '../projects/components'
import App from './app.vue'

Vue.use(Lopo)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
