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

  methods: {
    handleClick() {
      this.$goto(this.to)
    }
  }
})
</script>
