<template>
  <div>
    <XInput
      :value="formattedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      readonly
      @click.native="handleClick"
    />
    <component
      :is="picker"
      :visible.sync="localVisible"
      v-model="localValue"
      v-bind="$attrs">
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
    clearable: Boolean
  },

  computed: {
    formattedValue() {
      const { format, localValue } = this
      return format ? format(localValue) : localValue
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
