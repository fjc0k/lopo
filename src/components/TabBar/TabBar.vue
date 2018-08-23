<template>
  <div :class="_.wrapper">
    <div :class="_.holder" />
    <div :class="_.tabBar">
      <IndexNodes :nodes="$slots.default" />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import IndexNodes from '../Functional/IndexNodes.vue'

export default createComponent({
  name: 'TabBar',

  components: { IndexNodes },

  provide() {
    return {
      TabBar: this
    }
  },

  model: {
    prop: 'index',
    event: 'input'
  },

  props: {
    index: {
      numeric: true,
      default: 0,
      transform: parseInt
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/TabBar.module.styl" module />
