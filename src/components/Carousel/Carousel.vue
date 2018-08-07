<template>
  <div :class="['swiper-container', _.carousel]">
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div class="swiper-pagination" />
  </div>
</template>

<script>
import { Swiper, Pagination, Autoplay } from 'swiper/dist/js/swiper.esm.js'
import { createComponent } from '../_utils'

Swiper.use([Pagination, Autoplay])

export default createComponent({
  name: 'Carousel',

  inheritAttrs: false,

  model: {
    prop: 'index',
    event: 'change'
  },

  props: {
    index: {
      numeric: true,
      default: 0,
      transform: Number
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
    swiperOptions: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    isOn: {
      get() {
        return this.localValue === this.onValue
      },
      set(state) {
        this.sendValue(state ? this.onValue : this.offValue)
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      const self = this
      this.swiper = new Swiper(this.$el, {
        ...this.swiperOptions,
        init: true, // Whether Swiper should be initialised automatically when you create an instance.
        initialSlide: this.index, // Index number of initial slide.
        direction: this.direction, // Could be 'horizontal' or 'vertical' (for vertical slider).
        loop: this.loop,
        autoplay: this.autoplay && {
          delay: this.interval
        },
        pagination: this.indicator && {
          el: '.swiper-pagination'
        },
        on: {
          ...this.swiperOptions.on,
          init() {
            self.$emit('ready', this)
          },
          transitionEnd() {
            self.sendIndex(this.realIndex)
          }
        }
      })
    })
  },

  beforeDestroy() {
    this.swiper && this.swiper.destroy()
  }
})
</script>

<style src="swiper/dist/css/swiper.css" />

<style lang="stylus" src="../_styles/components/Carousel.styl" module />
