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
            index === 0 ? _['first-child']
              : index === lastChildrenIndex ? _['last-child']
                : null
          ),
          top && _[`top-${top}`],
          right && _[`right-${right}`],
          bottom && _[`bottom-${bottom}`],
          left && _[`left-${left}`],
          betweenX && _['between-x'],
          betweenY && _['between-y']
        ]
      }
      return vnode
    })
  }
})
</script>
