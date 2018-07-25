<template>
  <button
    :type="nativeType"
    :class="[
      _.button,
      _[type],
      _[shape],
      plain && _.plain,
      mini && _.mini,
      noBorder && _.borderless
    ]"
    @click="handleClick">
    <slot />
  </button>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Button',

  props: {
    nativeType: {
      type: String,
      enum: ['button', 'submit', 'reset']
    },
    type: {
      type: String,
      enum: ['default', 'primary', 'warning', 'danger']
    },
    shape: {
      type: String,
      enum: ['flat', 'square', 'round', 'circle']
    },
    plain: Boolean,
    mini: Boolean,
    noBorder: Boolean
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Button.styl" module />
