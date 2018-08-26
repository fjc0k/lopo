<template>
  <div :class="[_.wrapper, mini && _.mini]">
    <button
      v-feedback="_.active"
      :type="nativeType"
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
    </button>
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

<style lang="stylus" src="../_styles/components/Button.module.styl" module />
