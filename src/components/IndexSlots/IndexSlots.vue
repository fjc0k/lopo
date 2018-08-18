<script>
import { set } from 'lodash'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'IndexSlots',

  functional: true,

  render(h, { parent: { $slots = {} } }) {
    return ($slots.default || []).map((vnode, index) => {
      set(vnode, ['componentOptions', 'propsData', 'index'], index)
      return vnode
    })
  }
})
</script>
