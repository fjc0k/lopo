<template>
  <Pick :picker="SinglePicker" v-bind="$attrs" v-on="$listeners">
    <PassSlots />
  </Pick>
</template>

<script>
import { createComponent } from '../_utils'
import Pick from './Pick.vue'
import SinglePicker from './SinglePicker.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'PickOne',

  inheritAttrs: false,

  components: {
    Pick,
    PassSlots
  },

  data: () => ({ SinglePicker })
})
</script>
