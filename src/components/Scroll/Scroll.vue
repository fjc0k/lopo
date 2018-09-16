<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" style="width: auto;">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper/dist/js/swiper.js'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Scroll',

  props: {
    direction: {
      type: String,
      enum: ['vertical', 'horizontal']
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  mounted() {
    this.$nextTick(() => {
      const self = this
      this.swiper = new Swiper(this.$el, {
        ...this.options,
        direction: this.direction,
        init: true,
        slidesPerView: 'auto',
        freeMode: true,
        on: {
          ...this.options.on,
          init() {
            self.$emit('ready', this)
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
