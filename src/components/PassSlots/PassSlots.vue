<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'PassSlots',

  functional: true,

  render(h, { parent: { $slots = {} } }) {
    return Object
      .keys($slots)
      .map(slot => h('template', { slot }, $slots[slot]))
  }
})
</script>
