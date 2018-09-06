<template>
  <div :class="_.holder">
    <div :class="[_['action-bar'], noBorder && _['no-border']]">
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

<style lang="stylus" src="../_styles/components/ActionBar.module.styl" module />
