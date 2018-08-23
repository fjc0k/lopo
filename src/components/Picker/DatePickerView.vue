<template>
  <PickerView
    v-model="localValue"
    v-bind="$attrs"
    v-on="$passListeners('input')"
    :data="data"
    ref="view"
  />
</template>

<script>
/* eslint max-nested-callbacks: 0 */
import { range } from 'lodash'
import { subYears, addYears, parse, getDaysInMonth } from 'date-fns'
import { createComponent, dateToArray, formatDate } from '../_utils'
import PickerView from './PickerView.vue'

const now = new Date()
const RANGE_12 = range(1, 13)
const RANGE_24 = range(0, 24)
const RANGE_60 = range(0, 60)
const RANGE_12_0 = range(0, 12)

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
      enum: ['date', 'month', 'year', 'time', 'datetime']
    },
    clock: {
      numeric: true,
      default: 24,
      transform: Number
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
    secondSelectable: Boolean,
    filterYear: Function,
    filterMonth: Function,
    filterDay: Function,
    filterHour: Function,
    filterMinute: Function,
    filterSecond: Function,
    formatYear: String,
    formatMonth: String,
    formatDay: String,
    formatHour: String,
    formatMinute: String,
    formatSecond: String
  },

  computed: {
    is12HourClock() {
      return this.localClock === 12
    },
    noDate() {
      return this.mode === 'time'
    },
    noMonth() {
      return this.mode === 'year'
    },
    noDay() {
      return this.mode === 'month' || this.month === 'year'
    },
    noTime() {
      return this.mode === 'date' || this.mode === 'month' || this.mode === 'year'
    },
    noSecond() {
      return !this.secondSelectable
    },
    dateData() {
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
            let months = RANGE_12
            if (year === localStartDate[0]) {
              months = months.filter(month => month >= localStartDate[1])
            }
            if (year === localEndDate[0]) {
              months = months.filter(month => month <= localEndDate[1])
            }
            if (filterMonth) {
              months = months.filter(month => filterMonth({ year, month }))
            }
            return [months.map(month => {
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
                  return [days.map(day => {
                    return {
                      label: formatDay ? formatDate({ y: year, m: month, d: day }, formatDay) : day,
                      value: day
                    }
                  })]
                })()
              }
            })]
          })()
        }
      })
    },
    timeData() {
      const {
        filterHour,
        filterMinute,
        formatHour,
        formatMinute,
        is12HourClock
      } = this

      // 12 小时制：从 12 开始算起，午夜为上午 12 点，正午为下午 12 点
      if (is12HourClock) {
        const sessions = [
          { label: '上午', value: 'am' },
          { label: '下午', value: 'pm' }
        ]
        return sessions.map(session => {
          const sessionValue = session.value
          session.children = (() => {
            let hours = RANGE_12_0
            if (filterHour) {
              hours = hours.filter(hour => filterHour({ session: sessionValue, hour: hour || 12 }))
            }
            return [hours.map(hour => {
              const realHour = hour || 12
              return {
                label: formatHour ? formatDate({ h: realHour }, formatHour) : realHour,
                value: realHour,
                children: (() => {
                  let minutes = RANGE_60
                  if (filterMinute) {
                    minutes = minutes.filter(minute => filterMinute({ session: sessionValue, hour: realHour, minute }))
                  }
                  return [minutes.map(minute => {
                    return {
                      label: formatMinute ? formatDate({ h: realHour, i: minute }, formatMinute) : minute,
                      value: minute
                    }
                  })]
                })()
              }
            })]
          })()
          return session
        })
      }

      // 24 小时制
      let hours = RANGE_24
      if (filterHour) {
        hours = hours.filter(hour => filterHour({ hour }))
      }
      return hours.map(hour => {
        return {
          label: formatHour ? formatDate({ h: hour }, formatHour) : hour,
          value: hour,
          children: (() => {
            let minutes = RANGE_60
            if (filterMinute) {
              minutes = minutes.filter(minute => filterMinute({ hour, minute }))
            }
            return [minutes.map(minute => {
              return {
                label: formatMinute ? formatDate({ h: hour, i: minute }, formatMinute) : minute,
                value: minute
              }
            })]
          })()
        }
      })
    },
    secondData() {
      const {
        filterSecond,
        formatSecond
      } = this
      let seconds = RANGE_60
      if (filterSecond) {
        seconds = seconds.filter(second => filterSecond({ second }))
      }
      return seconds.map(second => {
        return {
          label: formatSecond ? formatDate({ s: second }, formatSecond) : second,
          value: second
        }
      })
    },
    data() {
      const data = []
      if (!this.noDate) {
        data.push(this.dateData)
      }
      if (!this.noTime) {
        data.push(this.timeData)
        if (!this.noSecond) {
          data.push(this.secondData)
        }
      }
      return data
    }
  },

  methods: {
    update() {
      this.$refs.view.update()
    }
  }
})
</script>
