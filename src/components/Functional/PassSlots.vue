<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'PassSlots',

  functional: true,

  props: {
    exclude: Array
  },

  render(h, { parent: { $slots = {} }, props: { exclude } }) {
    return Object
      .keys($slots)
      .map(slot => {
        return exclude.indexOf(slot) > -1
          ? null
          : h('template', { slot }, $slots[slot])
      })
  }
})
</script>
