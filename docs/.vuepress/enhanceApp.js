import './styles.styl'
import '../../dist/lopo.css'
import lopo from '../../dist/lopo.common'
import VueClipboard from 'vue-clipboard2'

export default ({ Vue }) => {
  Vue.prototype.$lopo = lopo
  Vue.use(lopo)
  Vue.use(VueClipboard)
}
