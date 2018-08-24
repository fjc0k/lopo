<script>
import _ from '../_styles/components/Spacing.module.styl'
import { createComponent } from '../_utils'

const sizeArr = [undefined, 'xs', 'sm', 'md', 'lg', 'xl']

export default createComponent({
  name: 'Spacing',

  functional: true,

  props: {
    top: {
      type: String,
      enum: sizeArr
    },
    right: {
      type: String,
      enum: sizeArr
    },
    bottom: {
      type: String,
      enum: sizeArr
    },
    left: {
      type: String,
      enum: sizeArr
    },
    x: {
      type: String,
      enum: sizeArr
    },
    y: {
      type: String,
      enum: sizeArr
    },
    all: {
      type: String,
      enum: sizeArr
    }
  },

  render(
    h,
    {
      props: {
        all,
        x = all,
        y = all,
        top = y,
        right = x,
        bottom = y,
        left = x
      } = {},
      children
    }
  ) {
    return children.map(vnode => {
      if (vnode.tag) {
        (vnode.data || (vnode.data = {})).class = [
          vnode.data.class,
          top && _[`${top}Top`],
          right && _[`${right}Right`],
          bottom && _[`${bottom}Bottom`],
          left && _[`${left}Left`]
        ]
      }
      return vnode
    })
  }
})
</script>
