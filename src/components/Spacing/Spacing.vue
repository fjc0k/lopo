<script>
import _ from '../_styles/components/Spacing.module.styl'
import { createComponent } from '../_utils'

const sizeArr = [undefined, 'xs', 'sm', 'md', 'lg', 'xl']

const sizeValidator = value => sizeArr.indexOf(value) > -1

export default createComponent({
  name: 'Spacing',

  functional: true,

  props: {
    top: {
      type: String,
      validator: sizeValidator
    },
    right: {
      type: String,
      validator: sizeValidator
    },
    bottom: {
      type: String,
      validator: sizeValidator
    },
    left: {
      type: String,
      validator: sizeValidator
    },
    x: {
      type: String,
      validator: sizeValidator
    },
    y: {
      type: String,
      validator: sizeValidator
    },
    all: {
      type: String,
      validator: sizeValidator
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
