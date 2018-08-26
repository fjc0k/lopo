<template>
  <PickerView
    v-model="actualValue"
    v-bind="$attrs"
    v-on="$passListeners('input')"
    :data="localData"
    ref="view"
  />
</template>

<script>
import { createComponent } from '../_utils'
import PickerView from './PickerView.vue'

export default createComponent({
  name: 'SinglePickerView',

  inheritAttrs: false,

  components: { PickerView },

  props: {
    value: null,
    data: {
      type: Array,
      default: () => [],
      transform: data => [data]
    }
  },

  computed: {
    actualValue: {
      get() {
        return [this.localValue]
      },
      set(value) {
        this.sendValue(value[0])
      }
    }
  },

  methods: {
    update() {
      this.$refs.view.update()
    }
  }
})
</script>
