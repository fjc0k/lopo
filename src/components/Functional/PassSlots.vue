<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'PassSlots',

  functional: true,

  props: {
    exclude: Array,
    map: {
      type: Object,
      default: () => ({})
    }
  },

  render(h, { parent: { $slots = {} }, props: { exclude, map } }) {
    return Object
      .keys($slots)
      .map(slot => {
        return exclude && exclude.indexOf(slot) > -1
          ? null
          : h(
            'template',
            { slot: map[slot] || slot },
            $slots[slot]
          )
      })
  }
})
</script>
