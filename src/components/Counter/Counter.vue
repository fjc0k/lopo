<template>
  <div :class="_.counter">

  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Counter',

  props: {
    value: {
      numeric: true,
      transform: Number
    },
    min: {
      numeric: true,
      infinite: true,
      default: -Infinity,
      transform: Number
    },
    max: {
      numeric: true,
      infinite: true,
      default: Infinity,
      transform: Number
    },
    step: {
      numeric: true,
      default: 1,
      transform: Number
    },
    readonly: Boolean,
    disabled: Boolean
  }
})
</script>

<style lang="stylus" src="../_styles/components/Counter.styl" module />
