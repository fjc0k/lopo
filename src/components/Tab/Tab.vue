<template>
  <CarouselItem :class="[_.tab, active && _.active]" @click.native="handleClick">
    <slot />
  </CarouselItem>
</template>

<script>
import { createComponent } from '../_utils'
import CarouselItem from '../CarouselItem/CarouselItem.vue'

export default createComponent({
  name: 'Tab',

  components: { CarouselItem },

  inject: {
    Tabs: {
      default: null
    }
  },

  props: {
    index: {
      numeric: true,
      default: 0,
      transform: parseInt
    },
    value: null
  },

  computed: {
    actualValue() {
      return this.$isNil(this.value) ? this.localIndex : this.value
    },
    active() {
      return this.Tabs && this.Tabs.localValue === this.actualValue
    }
  },

  methods: {
    handleClick() {
      this.Tabs && this.Tabs.sendValue(this.actualValue)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Tab.styl" module />
