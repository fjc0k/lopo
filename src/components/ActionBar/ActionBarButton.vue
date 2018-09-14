<template>
  <XButton
    :class="_['action-bar-button']"
    shape="square"
    noBorder
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </XButton>
</template>

<script>
import XButton from '../Button/Button.vue'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'ActionBarButton',

  inheritAttrs: false,

  components: { XButton }
})
</script>

<style lang="stylus" src="../_styles/components/ActionBarButton.module.styl" module />
