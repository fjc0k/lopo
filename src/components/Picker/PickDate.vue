<template>
  <Pick :picker="DatePicker" v-bind="$attrsAll" v-on="$listeners">
    <PassSlots />
  </Pick>
</template>

<script>
import { createComponent } from '../_utils'
import Pick from './Pick.vue'
import DatePicker from './DatePicker.vue'
import PassSlots from '../Functional/PassSlots.vue'

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
