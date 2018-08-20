<template>
  <Carousel :class="_.tabs" :indicator="false" :autoplay="false" :loop="false" :options="{
    slidesPerView: 'auto',
    freeMode: true,
    slideToClickedSlide: true
  }">
    <IndexNodes :nodes="$slots.default" />
  </Carousel>
</template>

<script>
import { createComponent } from '../_utils'
import IndexNodes from '../IndexNodes/IndexNodes.vue'
import Carousel from '../Carousel/Carousel.vue'

export default createComponent({
  name: 'Tabs',

  components: {
    IndexNodes,
    Carousel
  },

  provide() {
    return {
      Tabs: this
    }
  },

  props: {
    value: {
      type: null,
      default: 0
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Tabs.styl" module />
