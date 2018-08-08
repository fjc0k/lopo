<template>
  <Sheet
    v-model="localVisible"
    v-bind="$props"
    @cancel="handleCancel"
    @confirm="handleConfirm">
    <PassSlots />
    <component
      :is="view"
      v-model="stagedValue"
      v-bind="$attrs"
      ref="view"
    />
  </Sheet>
</template>

<script>
import { createComponent } from '../_utils'
import Sheet from '../Sheet/Sheet.vue'
import PickerView from '../PickerView/PickerView.vue'
import PassSlots from '../PassSlots/PassSlots.vue'

export default createComponent({
  name: 'Picker',

  hidable: {
    sync: true
  },

  inheritAttrs: false,

  components: {
    Sheet,
    PickerView,
    PassSlots
  },

  maskProps: {
    closable: true,
    transparent: false,
    through: false
  },

  props: {
    value: {
      type: Array,
      default: () => [],
      transform: value => value.slice()
    },
    view: {
      type: null,
      default: PickerView
    },
    ...Sheet.props
  },

  data: () => ({
    stagedValue: []
  }),

  beforeMount() {
    this.stagedValue = this.localValue.slice()
    this.$on('show', () => {
      this.$refs.view.update()
    })
  },

  methods: {
    handleCancel() {
      this.stagedValue = this.localValue.slice()
      this.$emit('cancel', ...arguments)
    },
    handleConfirm() {
      this.$emit('confirm', ...arguments)
      this.sendValue(this.stagedValue.slice())
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Picker.styl" module />