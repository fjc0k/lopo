<template>
  <Picker
    :view="DatePickerView"
    v-bind="$attrs"
    v-on="$listeners">
    <PassSlots />
  </Picker>
</template>

<script>
import { createComponent } from '../_utils'
import Picker from './Picker.vue'
import DatePickerView from './DatePickerView.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'DatePicker',

  inheritAttrs: false,

  components: {
    Picker,
    PassSlots
  },

  data: () => ({
    DatePickerView
  })
})
</script>
