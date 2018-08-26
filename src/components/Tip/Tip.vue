<template>
  <Popover
    v-model="localVisible"
    v-bind="$attrs"
    :popperClass="_.tip"
    noBorder>
    <slot />
    <template slot="message">
      <slot name="message">{{ message }}</slot>
      <Icon name="l-close" />
    </template>
  </Popover>
</template>

<script>
import { createComponent } from '../_utils'
import Popover from '../Popover/Popover.vue'
import Icon from '../Icon/Icon.vue'

export default createComponent({
  name: 'Tip',

  inheritAttrs: false,

  hidable: true,

  components: { Popover, Icon },

  props: {
    message: null
  }
})
</script>

<style lang="stylus" src="../_styles/components/Tip.module.styl" module />
