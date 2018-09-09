<template>
  <div :class="[_.wrapper, _[dir]]" ref="wrapper">
    <div :class="_.view" ref="view">
      <slot />
    </div>
  </div>
</template>

<script>
import { toArray } from 'lodash'
import applyTransform from 'css3transform'
import AlloyTouch from './AlloyTouch'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Scroll',

  model: {
    prop: 'index',
    event: 'input'
  },

  props: {
    index: {
      numeric: true,
      default: 0,
      transform: Number
    },
    dir: {
      type: String,
      enum: ['y', 'x']
    },
    options: {
      type: Object,
      default: () => ({})
    },
    sticky: Boolean
  },

  data: () => ({
    view: null
  }),

  computed: {
    isVertical() {
      return this.dir !== 'x'
    }
  },

  methods: {
    createOrUpdateScrollView() {
      this.$nextTick(() => {
        const { isVertical, sticky } = this
        const transformProperty = isVertical ? 'translateY' : 'translateX'
        const sizeProperty = isVertical ? 'height' : 'width'
        const wrapper = this.$refs.wrapper
        const view = this.$refs.view
        const wrapperSize = wrapper.getBoundingClientRect()

        let min
        if (isVertical) {
          min = -(view.getBoundingClientRect()[sizeProperty] - wrapperSize[sizeProperty])
        } else {
          const viewWidth = toArray(view.children).reduce((width, node) => {
            const nodeWidth = node.getBoundingClientRect()[sizeProperty]
            width += nodeWidth
            return width
          }, 0)
          min = -(viewWidth - wrapperSize[sizeProperty])
        }

        let step
        if (sticky) {
          step = view.children[0].getBoundingClientRect()[sizeProperty]
        }

        if (this.view) {
          this.view.step = step
          this.view.min = min
          this.view.correction(0)
          return
        }

        applyTransform(view, true)

        this.view = new AlloyTouch({
          touch: this.$refs.wrapper,
          vertical: isVertical,
          target: view,
          property: transformProperty,
          max: 0,
          min: min,
          step: step,
          ...this.options,
          animationEnd: value => {
            if (this.view.step) {
              this.sendIndex(Math.round(Math.abs(value / this.view.step)))
            }
            this.options.animationEnd && this.options.animationEnd.call(this.view, value)
          }
        })
      })
    }
  },

  mounted() {
    this.createOrUpdateScrollView()
    window.addEventListener('resize', this.createOrUpdateScrollView, false)
  },

  updated() {
    this.createOrUpdateScrollView()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.createOrUpdateScrollView, false)
    if (this.view) {
      this.view.destroy()
      this.view = null
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Scroll.module.styl" module />
