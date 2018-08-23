<script>
import { set } from 'lodash'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'IndexNodes',

  functional: true,

  props: {
    nodes: Array
  },

  render(h, { props: { nodes = [] } }) {
    return nodes.map((vnode, index) => {
      set(vnode, ['componentOptions', 'propsData', 'index'], index)
      return vnode
    })
  }
})
</script>
