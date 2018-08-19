<template>
  <div :class="_.wrapper">
    <div :class="_.marquee">
      <div
        :class="_.content"
        :style="{ transform: `translateX(${translateX}px) translateZ(0px)` }"
        ref="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Marquee',

  props: {
    fps: {
      numeric: true,
      default: 60
    },
    delayBeforeStart: {
      numeric: true,
      default: 1000
    },
    delayAfterEnd: {
      numeric: true,
      default: 1000
    }
  },

  data: () => ({
    translateX: 0
  }),

  methods: {
    run(boot) {
      this.delayTimerAfterEnd = setTimeout(() => {
        this.translateX = 0
        const wrapperWidth = this.$el.clientWidth
        const contentWidth = this.$refs.content.clientWidth
        this.delayTimerBeforeStart = setTimeout(() => {
          if (contentWidth > wrapperWidth) {
            this.translateTimer = setInterval(() => {
              this.translateX -= 1
              if (this.translateX < -(contentWidth - wrapperWidth) - 10) {
                clearInterval(this.translateTimer)
                this.run()
              }
            }, 1000 / this.fps)
          }
        }, this.delayBeforeStart)
      }, boot ? 0 : this.delayAfterEnd)
    }
  },

  mounted() {
    this.run(true)
  },

  beforeDestroy() {
    clearInterval(this.translateTimer)
    clearTimeout(this.delayTimerBeforeStart)
    clearTimeout(this.delayTimerAfterEnd)
  }
})
</script>

<style lang="stylus" src="../_styles/components/Marquee.styl" module />
