<template>
  <div :class="_.holder">
    <div :class="[_.bar, noBorder && _.borderless]">
      <slot />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'ActionBar',

  props: {
    noBorder: Boolean
  }
})
</script>

<style lang="stylus" src="../_styles/components/ActionBar.styl" module />
