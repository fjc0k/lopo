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
    },
    between: {
      type: Boolean,
      default: false
    },
    betweenX: {
      type: Boolean,
      default: undefined
    },
    betweenY: {
      type: Boolean,
      default: undefined
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
        left = x,
        between,
        betweenX = between,
        betweenY = between
      } = {},
      children
    }
  ) {
    const lastChildrenIndex = children.length - 1
    return children.map((vnode, index) => {
      if (vnode.tag) {
        (vnode.data || (vnode.data = {})).class = [
          vnode.data.class,
          (
            index === 0 ? _.firstChild
              : index === lastChildrenIndex ? _.lastChild
                : null
          ),
          top && _[`${top}Top`],
          right && _[`${right}Right`],
          bottom && _[`${bottom}Bottom`],
          left && _[`${left}Left`],
          betweenX && _.betweenX,
          betweenY && _.betweenY
        ]
      }
      return vnode
    })
  }
})
</script>
