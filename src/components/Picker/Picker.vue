<template>
  <Sheet
    v-model="localVisible"
    v-bind="$props"
    @cancel="handleCancel"
    @confirm="handleConfirm">
    <PassSlots />
    <component
      :is="view"
      :detail.sync="stagedDetail"
      v-model="stagedValue"
      v-bind="$attrs"
      v-on="$passListeners(['input', 'update:detail'])"
      ref="view"
    />
  </Sheet>
</template>

<script>
import { createComponent } from '../_utils'
import Sheet from '../Sheet/Sheet.vue'
import PickerView from './PickerView.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'Picker',

  hidable: {
    sync: true
  },

  inheritAttrs: false,

  components: {
    Sheet,
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
    detail: {
      type: Array,
      default: () => [],
      sync: true
    },
    view: {
      type: null,
      default: () => PickerView
    },
    ...Sheet.props
  },

  data: () => ({
    stagedValue: [],
    stagedDetail: []
  }),

  created() {
    this.stagedValue = this.localValue.slice()
    this.$on('after-show', () => {
      this.$refs.view.update()
    })
  },

  mounted() {
    setTimeout(() => {
      this.sendDetail(this.stagedDetail)
    }, 15)
  },

  methods: {
    handleCancel() {
      this.stagedValue = this.localValue.slice()
      this.$emit('cancel', ...arguments)
    },
    handleConfirm() {
      this.$emit('confirm', ...arguments)
      this.sendValue(this.stagedValue.slice())
      this.sendDetail(this.stagedDetail)
    }
  }
})
</script>
