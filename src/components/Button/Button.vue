<template>
  <div
    v-feedback="_.active"
    :class="[
      _.button,
      _[type],
      _[shape],
      plain && _.plain,
      mini && _.mini,
      noBorder && _['no-border']
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
    noBorder: Boolean
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Button.module.styl" module />
