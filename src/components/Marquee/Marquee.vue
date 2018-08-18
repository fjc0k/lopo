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

  data: () => ({
    translateX: 0
  }),

  methods: {
    run() {
      this.delayTimer = setTimeout(() => {
        this.translateX = 0
        const wrapperWidth = this.$el.clientWidth
        const contentWidth = this.$refs.content.clientWidth
        this.delayTimer2 = setTimeout(() => {
          if (contentWidth > wrapperWidth) {
            this.translateTimer = setInterval(() => {
              this.translateX -= 1
              if (this.translateX < -(contentWidth - wrapperWidth) - 10) {
                clearInterval(this.translateTimer)
                this.run()
              }
            }, 20)
          }
        }, 500)
      }, 500)
    }
  },

  mounted() {
    this.run()
  },

  beforeDestroy() {
    clearInterval(this.translateTimer)
    clearTimeout(this.delayTimer)
    clearTimeout(this.delayTimer2)
  }
})
</script>

<style lang="stylus" src="../_styles/components/Marquee.styl" module />
