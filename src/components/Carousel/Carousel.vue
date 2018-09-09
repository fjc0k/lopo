<template>
  <div :class="[_.carousel, _[direction]]">
    <Scroll
      v-model="localIndex"
      :direction="direction"
      :options="localOptions"
      :sticky="true"
      :loop="loop"
      ref="scroll">
      <slot />
    </Scroll>
    <div :class="_.indicator" v-if="indicator">
      <div
        :class="[_.dot, i - 1 === localIndex && _.active]"
        v-for="i in $slots.default.length"
        :key="i"
      />
    </div>
  </div>
</template>

<script>
import Scroll from '../Scroll/Scroll.vue'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Carousel',

  inheritAttrs: false,

  components: {
    Scroll
  },

  model: {
    prop: 'index',
    event: 'input'
  },

  props: {
    index: {
      numeric: true,
      default: 0,
      transform: parseInt,
      on: {
        receive(index) {
          this.$refs.scroll && this.$refs.scroll.view && this.$refs.scroll.view.toIndex(index)
        }
      }
    },
    direction: {
      type: String,
      enum: ['horizontal', 'vertical']
    },
    interval: {
      numeric: true,
      default: 3000,
      transform: Number
    },
    indicator: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    localOptions() {
      // const self = this
      return {
        ...this.options,
        inertia: false,
        touchEnd(e, value, index) {
          // if (self.loop) {
          //   const children = self.$slots.default
          //   const total = children.length
          //   console.log(children[0].elm)
          // }
          const nextValue = -(index * this.step)
          const dv = value - nextValue
          if (value < this.min) {
            this.to(this.min)
          } else if (value > this.max) {
            this.to(this.max)
          } else if (Math.abs(dv) < 30) {
            this.to(nextValue)
          } else if (dv > 0) {
            this.to(nextValue + this.step)
          } else {
            this.to(nextValue - this.step)
          }
          return false
        }
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Carousel.module.styl" module />
