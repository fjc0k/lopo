<template>
  <div :class="_.holder">
    <div :class="_.bar">
ddd
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'ActionBar',

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

<style lang="stylus" src="../_styles/components/ActionBar.styl" module />
