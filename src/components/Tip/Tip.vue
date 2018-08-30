<template>
  <Popover
    v-model="localVisible"
    v-bind="$attrs"
    :popperClass="_.tip">
    <slot />
    <template slot="message">
      <slot name="message">{{ message }}</slot>
      <Icon
        :class="_.close"
        name="l-close"
        @click.native="handleCloseClick"
      />
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
  },

  methods: {
    handleCloseClick() {
      this.sendVisible(false)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Tip.module.styl" module />
