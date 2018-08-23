<template>
  <Picker
    :view="AddressPickerView"
    v-bind="$attrs"
    v-on="$listeners">
    <PassSlots />
  </Picker>
</template>

<script>
import { createComponent } from '../_utils'
import Picker from './Picker.vue'
import AddressPickerView from './AddressPickerView.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'AddressPicker',

  inheritAttrs: false,

  components: {
    Picker,
    PassSlots
  },

  data: () => ({
    AddressPickerView
  })
})
</script>
