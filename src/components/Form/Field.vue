<template>
  <ListItem
    :class="[_.field, _[align], required && _.required, localError && _.error]"
    :title="label"
    :extra="null"
    :icon="null"
    :leftStyle="{ width: labelWidth }"
    v-bind="$attrs">
    <PassSlots
      :exclude="['title', 'extra', 'icon']"
      :map="{ label: 'title' }"
    />
    <template slot="extra">
      <slot name="extra">{{ extra }}</slot>
      <l-icon
        :class="_.errorTip"
        name="l-warning-circle"
        v-if="localError"
        @click.native="handleErrorTipClick"
      />
    </template>
    <Toast
      v-model="toastVisible"
      :message="validResult.message"
      position="top"
    />
  </ListItem>
</template>

<script>
import { castArray } from 'lodash'
import { createComponent } from '../_utils'
import ListItem from '../List/ListItem.vue'
import PassSlots from '../Functional/PassSlots.vue'
import Toast from '../Toast/Toast.vue'

export default createComponent({
  name: 'Field',

  components: { ListItem, PassSlots, Toast },

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
    extra: null,
    prop: String,
    align: {
      type: String,
      enum: ['left', 'center', 'right']
    },
    error: {
      type: Boolean,
      default: false,
      sync: true
    }
  },

  data: () => ({
    validResult: {},
    toastVisible: false
  }),

  computed: {
    labelWidth() {
      return this.Form && this.Form.labelWidth
    },
    required() {
      if (this.Form && this.prop) {
        return castArray(this.Form.rules[this.prop]).some(rule => !!rule.required)
      }
      return false
    }
  },

  methods: {
    validate() {
      const { Form, prop } = this
      if (Form) {
        Form.validate(prop ? { [prop]: Form.model[prop] } : undefined).then(result => {
          this.validResult = result
          if (!result.valid && result.prop === prop) {
            this.localError = true
          } else {
            this.localError = false
          }
        })
      }
    },
    handleErrorTipClick() {
      this.toastVisible = true
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Field.module.styl" module />
