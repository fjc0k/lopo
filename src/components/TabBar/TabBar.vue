<template>
  <div :class="_.wrapper">
    <div :class="_.holder" />
    <div :class="_.tabBar">
      <IndexSlots />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import IndexSlots from '../IndexSlots/IndexSlots.vue'

export default createComponent({
  name: 'TabBar',

  components: { IndexSlots },

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

<style lang="stylus" src="../_styles/components/TabBar.styl" module />
