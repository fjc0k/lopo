<template>
  <div :class="[_.wrapper, _[direction]]" ref="wrapper">
    <div :class="_.view" ref="view">
      <slot />
    </div>
  </div>
</template>

<script>
import { toArray } from 'lodash'
import applyTransform from 'css3transform'
import AlloyTouch from './AlloyTouch'
import { createComponent, dom } from '../_utils'

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
      transform: parseInt
    },
    direction: {
      type: String,
      enum: ['vertical', 'horizontal']
    },
    options: {
      type: Object,
      default: () => ({})
    },
    sticky: Boolean, // 是否吸附至最近的条目，要求每一个条目的宽或高一致
    loop: Boolean, // 是否循环
    additions: { // 循环时：添加在首尾的条目数
      numeric: true,
      default: 2,
      transform: parseInt
    }
  },

  data: () => ({
    view: null
  }),

  computed: {
    isVertical() {
      return this.direction !== 'horizontal'
    }
  },

  methods: {
    createOrUpdateScrollView() {
      this.$nextTick(() => {
        const isCreate = !this.view
        const { isVertical, sticky, loop, localAdditions, localIndex } = this
        const transformProperty = isVertical ? 'translateY' : 'translateX'
        const sizeProperty = isVertical ? 'height' : 'width'
        const wrapper = this.$refs.wrapper
        const view = this.$refs.view
        const wrapperSize = wrapper.getBoundingClientRect()

        this.children = view.children
        this.childrenCount = view.children.length

        if (isCreate && loop) {
          const heads = []
          const tails = []
          for (let i = 0; i < localAdditions; i++) {
            heads.push(this.children[i])
            tails.unshift(this.children[this.childrenCount - 1 - i])
          }
          for (let i = 0; i < localAdditions; i++) {
            dom.append(view, dom.clone(heads[i], { cloend: true, index: i }))
            dom.prepend(view, dom.clone(tails[i], { cloend: true, index: this.childrenCount - 1 - i }))
          }
        }

        let step
        if (sticky) {
          step = this.children[0].getBoundingClientRect()[sizeProperty]
        }

        let min
        if (isVertical) {
          const viewHeight = sticky ? step * this.childrenCount : view.getBoundingClientRect()[sizeProperty]
          min = -(viewHeight - wrapperSize[sizeProperty])
        } else {
          const viewWidth = sticky ? step * this.childrenCount : toArray(this.children).reduce((width, node) => {
            const nodeWidth = node.getBoundingClientRect()[sizeProperty]
            width += nodeWidth
            return width
          }, 0)
          min = -(viewWidth - wrapperSize[sizeProperty])
        }

        if (!isCreate) {
          this.view.step = step
          this.view.min = min
          this.view._correction(0)
          return
        }

        applyTransform(view, true)

        const options = {
          touch: this.$refs.wrapper,
          vertical: isVertical,
          target: view,
          property: transformProperty,
          max: 0,
          min: min,
          initialValue: step ? -(localIndex * step + (loop ? localAdditions * step : 0)) : 0,
          step: step,
          lockDirection: true,
          ...this.options,
          touchEnd: (e, value) => {
            // todo: 统一轮播的参数到此
            let index = this.view.getIndex(value)
            if (loop) {
              const isCloned = this.children[index].dataset.cloend
              index = isCloned ? +this.children[index].dataset.index : index - localAdditions
              if (isCloned) {
                this.view.to(-((index + localAdditions) * step), 0)
              }
            }
            this.sendIndex(index)
            // return this.options.touchEnd && this.options.touchEnd.call(this.view, e, value, index)
          },
          animationEnd: value => {
            // let index = this.view.currentPage
            // if (loop) {
            //   const isCloned = this.children[index].dataset.cloend
            //   index = isCloned ? +this.children[index].dataset.index : index - localAdditions
            //   if (isCloned) {
            //     this.view.to(-((index + localAdditions) * step), 0)
            //   }
            // }
            // this.sendIndex(index)
            return this.options.animationEnd && this.options.animationEnd.call(this.view, value)
          }
        }

        if (typeof this.options.transformOptions === 'function') {
          this.options.transformOptions(options, { isVertical, step })
        }

        this.view = new AlloyTouch(options)
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
