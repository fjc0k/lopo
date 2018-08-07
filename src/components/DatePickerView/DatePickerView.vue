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
  name: 'DatePickerView',

  inheritAttrs: false,

  components: { PickerView },

  props: {
    value: {
      type: Array,
      default: () => [],
      transform: value => value.slice()
    },
    mode: {
      type: String,
      enum: ['date', 'month', 'year']
    },
    startDate: {
      type: [Date, String, Number],
      default: () => subYears(now, 10),
      transform: date => dateToArray(parse(date))
    },
    endDate: {
      type: [Date, String, Number],
      default: () => addYears(now, 10),
      transform: date => dateToArray(parse(date))
    },
    filterYear: Function,
    filterMonth: Function,
    filterDay: Function,
    formatYear: String,
    formatMonth: String,
    formatDay: String
  },

  computed: {
    noMonth() {
      return this.mode === 'year'
    },
    noDay() {
      return this.mode !== 'date'
    },
    data() {
      const {
        localStartDate,
        localEndDate,
        filterYear,
        filterMonth,
        filterDay,
        formatYear,
        formatMonth,
        formatDay,
        noMonth,
        noDay
      } = this
      let years = range(localStartDate[0], localEndDate[0] + 1)
      if (filterYear) {
        years = years.filter(year => filterYear({ year }))
      }
      return years.map(year => {
        return {
          label: formatYear ? formatDate({ y: year }, formatYear) : year,
          value: year,
          children: noMonth ? undefined : (() => {
            let months = range(1, 13)
            if (year === localStartDate[0]) {
              months = months.filter(month => month >= localStartDate[1])
            }
            if (year === localEndDate[0]) {
              months = months.filter(month => month <= localEndDate[1])
            }
            if (filterMonth) {
              months = months.filter(month => filterMonth({ year, month }))
            }
            return months.map(month => {
              return {
                label: formatMonth ? formatDate({ y: year, m: month }, formatMonth) : month,
                value: month,
                children: noDay ? undefined : (() => {
                  let days = range(1, getDaysInMonth(new Date(year, month - 1)) + 1)
                  if (year === localStartDate[0] && month === localStartDate[1]) {
                    days = days.filter(day => day >= localStartDate[2])
                  }
                  if (year === localEndDate[0] && month === localEndDate[1]) {
                    days = days.filter(day => day <= localEndDate[2])
                  }
                  if (filterDay) {
                    days = days.filter(day => filterDay({ year, month, day }))
                  }
                  return days.map(day => ({
                    label: formatDay ? formatDate({ y: year, m: month, d: day }, formatDay) : day,
                    value: day
                  }))
                })()
              }
            })
          })()
        }
      })
    }
  }
})
</script>
