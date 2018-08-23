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
import Picker from '../Picker/Picker.vue'
import AddressPickerView from '../AddressPickerView/AddressPickerView.vue'
import PassSlots from '../PassSlots/PassSlots.vue'

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
