<template>
  <List tag="form" :class="_.form" v-bind="$attrs">
    <slot />
  </List>
</template>

<script>
import { createComponent } from '../_utils'
import List from '../List/List.vue'
import Validator from './Validator'

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
    },
    model: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    validator: new Validator()
  }),

  watch: {
    rules: {
      immediate: true,
      deep: true,
      handler(rules) {
        this.validator.setRules(rules)
      }
    }
  },

  methods: {
    validate(model = this.model) {
      return this.validator.validate(model).then(result => {
        if (!result.valid) {
          this.$toast.top(result.message)
        }
        this.$emit(result.valid ? 'valid' : 'invalid', result)
        return result
      })
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Form.module.styl" module />
