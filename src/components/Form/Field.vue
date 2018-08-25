<template>
  <ListItem
    :class="[_.field, _[align]]"
    :title="label"
    :leftStyle="{ width: labelWidth }"
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

  provide() {
    return {
      Field: this
    }
  },

  inject: {
    Form: {
      default: null
    }
  },

  props: {
    label: null,
    prop: String,
    align: {
      type: String,
      enum: ['left', 'center', 'right']
    }
  },

  computed: {
    labelWidth() {
      return this.Form && this.Form.labelWidth
    }
  },

  methods: {
    validate() {
      const { Form, prop } = this
      if (Form) {
        Form.validate(prop ? { [prop]: Form.model[prop] } : undefined)
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Field.module.styl" module />
