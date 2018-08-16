<template>
  <Pick :picker="AddressPicker" v-bind="$attrs" v-on="$listeners">
    <PassSlots />
  </Pick>
</template>

<script>
import { createComponent } from '../_utils'
import Pick from '../Pick/Pick.vue'
import AddressPicker from '../AddressPicker/AddressPicker.vue'
import PassSlots from '../PassSlots/PassSlots.vue'

export default createComponent({
  name: 'PickAddress',

  inheritAttrs: false,

  components: {
    Pick,
    PassSlots
  },

  data: () => ({ AddressPicker })
})
</script>
