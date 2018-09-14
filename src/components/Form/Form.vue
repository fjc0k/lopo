<template>
  <List tag="form" :class="_.form" v-bind="$attrs">
    <slot />
    <Toast
      v-model="toastVisible"
      :message="toastMessage"
      position="top"
    />
  </List>
</template>

<script>
import { createComponent } from '../_utils'
import List from '../List/List.vue'
import Toast from '../Toast/Toast.vue'
import Validator from './Validator'

export default createComponent({
  name: 'Form',

  components: { List, Toast },

  inheritAttrs: false,

  provide() {
    return {
      Form: this
    }
  },

  props: {
    labelWidth: {
      type: String,
      default: '5em'
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
    validator: new Validator(),
    validResult: {},
    toastVisible: false,
    toastMessage: ''
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
        this.validResult = result
        if (result.valid) {
          this.toastVisible = false
        } else {
          this.toastMessage = result.message
          this.toastVisible = true
        }
        this.$emit(result.valid ? 'valid' : 'invalid', result)
        return result
      })
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Form.module.styl" module />
