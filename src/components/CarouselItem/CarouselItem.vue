<template>
  <div class="swiper-slide" @click="handleClick">
    <slot>
      <img :src="image" :class="_.image" />
    </slot>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'CarouselItem',

  props: {
    image: String,
    to: [String, Object]
  },

  computed: {
    isUrl() {
      return typeof this.to === 'string' && /^https?:\/\//.test(this.to)
    }
  },

  methods: {
    handleClick() {
      if (this.isUrl) {
        location.href = this.to
      } else if (this.$router && this.$router.push) {
        this.$router.push(this.to)
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/CarouselItem.styl" module />
