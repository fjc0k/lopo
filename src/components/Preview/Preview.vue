<template>
  <div :class="[_.preview, plain && _.plain, noBorder && _.noBorder]">
    <slot />
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Preview',

  provide() {
    return {
      Preview: this
    }
  },

  props: {
    plain: Boolean,
    noBorder: Boolean
  }
})
</script>

<style lang="stylus" src="../_styles/components/Preview.module.styl" module />
