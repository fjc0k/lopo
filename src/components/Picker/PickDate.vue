<template>
  <Pick :picker="DatePicker" v-bind="$attrs" v-on="$listeners">
    <PassSlots />
  </Pick>
</template>

<script>
import { createComponent } from '../_utils'
import Pick from '../Pick/Pick.vue'
import DatePicker from '../DatePicker/DatePicker.vue'
import PassSlots from '../PassSlots/PassSlots.vue'

export default createComponent({
  name: 'PickDate',

  inheritAttrs: false,

  components: {
    Pick,
    PassSlots
  },

  data: () => ({ DatePicker })
})
</script>
