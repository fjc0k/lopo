<template>
  <div
    v-feedback="_.active"
    :class="[_['dialog-button'], _[type]]"
    @click="handleClick">
    <slot />
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import { feedback } from '../../directives'

export default createComponent({
  name: 'DialogButton',

  directives: { feedback },

  props: {
    type: {
      type: String,
      enum: ['default', 'primary', 'warning', 'danger']
    }
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/DialogButton.module.styl" module />
