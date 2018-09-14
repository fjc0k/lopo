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
import { isArray } from 'lodash'
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
      type: null,
      default: () => [],
      on: {
        receive(value) {
          this.stagedValue = isArray(value) ? value.slice() : value
        }
      }
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
      this.stagedValue = isArray(this.value) ? this.value.slice() : this.value
      this.$emit('cancel', ...arguments)
    },
    handleConfirm() {
      this.$emit('confirm', ...arguments)
      this.sendValue(isArray(this.stagedValue) ? this.stagedValue.slice() : this.stagedValue)
      this.sendDetail(this.stagedDetail)
    }
  }
})
</script>
