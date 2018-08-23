<template>
  <div :class="[_.list, noBorder && _.borderless]">
    <slot />
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'List',

  props: {
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
