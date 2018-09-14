<template>
  <Picker
    :view="SinglePickerView"
    v-bind="$attrsAll"
    v-on="$listeners">
    <PassSlots />
  </Picker>
</template>

<script>
import { createComponent } from '../_utils'
import Picker from './Picker.vue'
import SinglePickerView from './SinglePickerView.vue'
import PassSlots from '../Functional/PassSlots.vue'

export default createComponent({
  name: 'SinglePicker',

  inheritAttrs: false,

  components: {
    Picker,
    PassSlots
  },

  data: () => ({
    SinglePickerView
  })
})
</script>
