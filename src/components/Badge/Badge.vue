<template>
  <div
    :class="[
      _.wrapper,
      _[type],
      _[shape],
      plain && _.plain,
      dot && _.dot
    ]">
    <slot />
    <div :class="_.badge">
      <slot name="text">
        {{ localText }}
      </slot>
    </div>
  </div>
</template>

<script>
import { isNumber } from 'lodash'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Badge',

  props: {
    text: {
      type: null,
      transform(text) {
        return isNumber(text) && text > this.max
          ? `${this.max}+`
          : text
      }
    },
    max: {
      numeric: true,
      default: 99
    },
    type: {
      type: String,
      enum: ['default', 'primary', 'warning', 'info']
    },
    shape: {
      type: String,
      enum: ['round', 'flat', 'square']
    },
    plain: Boolean,
    dot: Boolean
  }
})
</script>

<style lang="stylus" src="../_styles/components/Badge.styl" module />
