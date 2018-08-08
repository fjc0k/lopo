<template>
  <PickerView
    v-model="localValue"
    v-bind="$attrs"
    :data="data"
    cascaded
  />
</template>

<script>
/* eslint max-nested-callbacks: 0 */
import { range } from 'lodash'
import { subYears, addYears, parse, getDaysInMonth } from 'date-fns'
import { createComponent, dateToArray, formatDate } from '../_utils'
import PickerView from '../PickerView/PickerView.vue'

const now = new Date()

export default createComponent({
  name: 'DatePickerView'
})
</script>
