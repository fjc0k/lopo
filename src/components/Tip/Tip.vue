<template>
  <Popover
    v-model="localVisible"
    v-bind="$attrs"
    :popperClass="_.tip">
    <slot />
    <template slot="message">
      <div :class="_.message">
        <slot name="message">{{ message }}</slot>
      </div>
      <div :class="_.close" @click="handleCloseClick" v-if="closable">
        <Icon name="l-close" />
      </div>
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
    message: null,
    closable: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleCloseClick() {
      this.sendVisible(false)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Tip.module.styl" module />
