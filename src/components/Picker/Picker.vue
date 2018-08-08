<template>
  <Sheet
    v-model="localVisible"
    :maskClosable="maskClosable"
    :maskThrough="maskThrough"
    :maskTransparent="maskTransparent">
    <PickerView v-model="localValue" v-bind="$attrs" ref="view" />
  </Sheet>
</template>

<script>
import { createComponent } from '../_utils'
import Sheet from '../Sheet/Sheet.vue'
import PickerView from '../PickerView/PickerView.vue'

export default createComponent({
  name: 'Picker',

  hidable: {
    sync: true
  },

  inheritAttrs: false,

  components: { Sheet, PickerView },

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
    }
  },

  beforeMount() {
    this.$on('show', () => {
      this.$refs.view.update()
    })
  }
})
</script>

<style lang="stylus" src="../_styles/components/Picker.styl" module />
