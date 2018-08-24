<template>
  <ListItem
    :class="_.field"
    :title="label"
    :leftStyle="{ width: Form.labelWidth }"
    v-bind="$attrs">
    <PassSlots :exclude="['title', 'label']" />
    <slot name="label" slot="title" />
  </ListItem>
</template>

<script>
import { createComponent } from '../_utils'
import ListItem from '../List/ListItem.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'Field',

  components: { ListItem, PassSlots },

  inheritAttrs: false,

  inject: {
    Form: {
      default: () => ({})
    }
  },

  props: {
    label: null
  }
})
</script>

<style lang="stylus" src="../_styles/components/Field.module.styl" module />
