<template>
  <div @click="handleClick">
    <XInput
      :value="formattedValue"
      :placeholder="placeholder"
      :clearable="clearable"
      disabled
    />
    <component
      :is="picker"
      :visible.sync="localVisible"
      :detail.sync="localDetail"
      v-model="localValue"
      v-bind="$attrs"
      v-on="$passListeners(['input', 'update:visible', 'update:detail'])">
      <PassSlots />
    </component>
  </div>
</template>

<script>
import { isArray, isNil } from 'lodash'
import { createComponent } from '../_utils'
import XInput from '../Input/Input.vue'
import Picker from './Picker.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'Pick',

  inheritAttrs: false,

  hidable: {
    sync: true
  },

  components: {
    XInput,
    PassSlots
  },

  props: {
    value: {
      type: null,
      default: () => []
    },
    detail: {
      type: Array,
      default: () => [],
      sync: true
    },
    separator: {
      type: String,
      default: ''
    },
    format: Function,
    placeholder: null,
    picker: {
      type: null,
      default: () => Picker
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    formatter() {
      return this.format ? this.format : (value, detail) => {
        return isArray(detail)
          ? detail.map(item => item && item.label).join(this.separator)
          : value
      }
    },
    formattedValue() {
      const { formatter, localValue, localDetail } = this
      return (isArray(localValue) ? !!localValue.length : !isNil(localValue))
        ? formatter(localValue, localDetail)
        : ''
    }
  },

  methods: {
    handleClick() {
      if (this.disabled) return
      this.sendVisible(!this.localVisible)
    }
  }
})
</script>
