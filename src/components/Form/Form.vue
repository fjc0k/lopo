<template>
  <List tag="form" :class="_.form" v-bind="$attrs">
    <slot />
  </List>
</template>

<script>
import { createComponent } from '../_utils'
import List from '../List/List.vue'

export default createComponent({
  name: 'Form',

  components: { List },

  inheritAttrs: false,

  provide() {
    return {
      Form: this
    }
  },

  props: {
    labelWidth: {
      type: String,
      default: '4.5em'
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Form.module.styl" module />
