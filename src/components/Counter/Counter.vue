<template>
  <div :class="_.counter">
    <div
      :class="[_.button, disableSubtract && _.disabled]"
      v-feedback="_.active"
      @click="handleSubtract">
      <Icon name="l-minus" />
    </div>
    <input
      :class="[_.input, disabled && _.disabled]"
      type="number"
      :disabled="disableInput"
      :value="localValue"
      @change="handleChange"
    />
    <div
      :class="[_.button, disableAdd && _.disabled]"
      v-feedback="_.active"
      @click="handleAdd">
      <Icon name="l-plus" />
    </div>
  </div>
</template>

<script>
import { createComponent } from '../_utils'
import { feedback } from '../../directives'
import Icon from '../Icon/Icon.vue'

export default createComponent({
  name: 'Counter',

  directives: { feedback },

  components: { Icon },

  props: {
    value: {
      numeric: true,
      default: 0,
      transform: Number
    },
    min: {
      numeric: true,
      infinite: true,
      default: -Infinity,
      transform: Number
    },
    max: {
      numeric: true,
      infinite: true,
      default: Infinity,
      transform: Number
    },
    step: {
      numeric: true,
      default: 1,
      transform: Number
    },
    noInput: Boolean,
    disabled: Boolean
  },

  computed: {
    disableSubtract() {
      return this.disabled || (this.localValue - this.localStep < this.localMin)
    },
    disableAdd() {
      return this.disabled || (this.localValue + this.localStep > this.localMax)
    },
    disableInput() {
      return this.disabled || this.noInput
    }
  },

  methods: {
    handleSubtract() {
      this.sendValue(this.localValue - this.localStep)
    },
    handleAdd() {
      this.sendValue(this.localValue + this.localStep)
    },
    handleChange(e) {
      const { localValue, localMin, localMax } = this
      let value = e.target.value.trim()
      if (value === '') {
        e.target.value = localValue
        return
      }
      value = +value
      if (value !== localValue) {
        const newValue = value < localMin
          ? localMin
          : value > localMax
            ? localMax
            : value
        if (newValue !== value) {
          e.target.value = newValue
        }
        this.sendValue(newValue)
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Counter.module.styl" module />
