<template>
  <label :class="_.choose">
    <input
      :class="_.input"
      :type="nativeType"
      v-model="localChosenValue"
      :value="localValue"
    />
    <div
      :class="[
        _.holder,
        _[nativeType],
        _[localShape]
      ]"
    />
    <div :class="_.label" v-if="$slots.default">
      <slot />
    </div>
  </label>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Choose',

  model: {
    prop: 'chosenValue',
    event: 'choose'
  },

  props: {
    chosenValue: null,
    value: null,
    type: {
      type: String,
      enum: ['auto', 'radio', 'checkbox', 'agree'],
      transform(type) {
        if (type === 'auto') {
          return Array.isArray(this.chosenValue)
            ? 'checkbox'
            : typeof this.chosenValue === 'boolean'
              ? 'agree'
              : 'radio'
        }
        return type
      }
    },
    shape: {
      type: String,
      enum: ['auto', 'square', 'circle']
    },
    disabled: Boolean
  },

  computed: {
    nativeType() {
      return this.localType === 'radio' ? 'radio' : 'checkbox'
    },
    localShape() {
      const { localType, shape } = this
      if (shape === 'auto') {
        return localType === 'radio' ? 'circle' : 'square'
      }
      return shape
    },
    localValue() {
      return this.localType === 'agree' ? true : this.value
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Choose.styl" module />
