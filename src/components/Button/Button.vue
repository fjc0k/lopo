<template>
  <div
    v-feedback="_.active"
    :class="[
      _.button,
      _[type],
      _[shape],
      plain && _.plain,
      mini && _.mini,
      noBorder && _['no-border'],
      disabled && _.disabled
    ]"
    v-bind="$attrs"
    @click="handleClick">
    <slot />
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import { feedback } from '../../directives'

export default createComponent({
  name: 'Button',

  inheritAttrs: false,

  directives: { feedback },

  props: {
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
    noBorder: Boolean,
    disabled: Boolean
  },

  methods: {
    handleClick(e) {
      if (this.disabled) return
      this.$emit('click', e)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Button.module.styl" module />
