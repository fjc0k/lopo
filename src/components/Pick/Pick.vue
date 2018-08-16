<template>
  <div>
    <XInput
      :value="formattedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      readonly
      @click="handleClick"
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
import { createComponent } from '../_utils'
import XInput from '../Input/Input.vue'
import Picker from '../Picker/Picker.vue'
import PassSlots from '../PassSlots/PassSlots.vue'

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
      type: Array,
      default: () => []
    },
    detail: {
      type: Array,
      default: () => [],
      sync: true
    },
    format: {
      type: Function,
      default: value => value.join(', ')
    },
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
    formattedValue() {
      const { format, localValue, localDetail } = this
      return localValue && localValue.length
        ? (format ? format(localValue, localDetail) : localValue)
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
