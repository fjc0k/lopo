<script>
import { values } from 'lodash'
import getIcon from 'vue-iconfont'
import { createComponent } from '../_utils'
import localIcons from './icons'

const icons = values(localIcons)
let Icon = null

export default createComponent({
  name: 'Icon',

  localIcons,

  props: {
    name: {
      type: String,
      required: true
    }
  },

  add(symbol) {
    const symbols = Array.isArray(symbol) ? symbol : [symbol]
    symbols.forEach(symbol => {
      icons.push(symbol)
    })
  },

  beforeMount() {
    if (!Icon) {
      Icon = getIcon({
        type: 'svg',
        sprite: [
          '<svg><defs>',
          ...icons,
          '</defs></svg>'
        ].join('')
      })
    }
  },

  render(h) {
    return h(Icon, {
      class: this._.icon,
      attrs: {
        name: this.name
      }
    })
  }
})
</script>
