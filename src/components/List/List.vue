<template>
  <component :is="tag" :class="[_.list, noBorder && _['no-border']]">
    <slot />
  </component>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'List',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    noBorder: Boolean,
    noDivider: Boolean,
    longDivider: Boolean
  },

  provide() {
    return {
      List: this
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/List.module.styl" module />
