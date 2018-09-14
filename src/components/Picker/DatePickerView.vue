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
import { isFunction, range } from 'lodash'
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
    formatYear: [String, Function],
    formatMonth: [String, Function],
    formatDay: [String, Function],
    formatHour: [String, Function],
    formatMinute: [String, Function],
    formatSecond: [String, Function]
  },

  computed: {
    localFormatYear() {
      const { formatYear } = this
      if (!formatYear) return
      const isCustomFunction = isFunction(formatYear)
      return (paramsForCustomFunction, paramsForFormatDate) => {
        return isCustomFunction
          ? formatYear(paramsForCustomFunction)
          : formatDate(paramsForFormatDate, formatYear)
      }
    },
    localFormatMonth() {
      const { formatMonth } = this
      if (!formatMonth) return
      const isCustomFunction = isFunction(formatMonth)
      return (paramsForCustomFunction, paramsForFormatDate) => {
        return isCustomFunction
          ? formatMonth(paramsForCustomFunction)
          : formatDate(paramsForFormatDate, formatMonth)
      }
    },
    localFormatDay() {
      const { formatDay } = this
      if (!formatDay) return
      const isCustomFunction = isFunction(formatDay)
      return (paramsForCustomFunction, paramsForFormatDate) => {
        return isCustomFunction
          ? formatDay(paramsForCustomFunction)
          : formatDate(paramsForFormatDate, formatDay)
      }
    },
    localFormatHour() {
      const { formatHour } = this
      if (!formatHour) return
      const isCustomFunction = isFunction(formatHour)
      return (paramsForCustomFunction, paramsForFormatDate) => {
        return isCustomFunction
          ? formatHour(paramsForCustomFunction)
          : formatDate(paramsForFormatDate, formatHour)
      }
    },
    localFormatMinute() {
      const { formatMinute } = this
      if (!formatMinute) return
      const isCustomFunction = isFunction(formatMinute)
      return (paramsForCustomFunction, paramsForFormatDate) => {
        return isCustomFunction
          ? formatMinute(paramsForCustomFunction)
          : formatDate(paramsForFormatDate, formatMinute)
      }
    },
    localFormatSecond() {
      const { formatSecond } = this
      if (!formatSecond) return
      const isCustomFunction = isFunction(formatSecond)
      return (paramsForCustomFunction, paramsForFormatDate) => {
        return isCustomFunction
          ? formatSecond(paramsForCustomFunction)
          : formatDate(paramsForFormatDate, formatSecond)
      }
    },
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
        localFormatYear,
        localFormatMonth,
        localFormatDay,
        noMonth,
        noDay
      } = this
      let years = range(localStartDate[0], localEndDate[0] + 1)
      if (filterYear) {
        years = years.filter(year => filterYear({ year }) !== false)
      }
      return years.map(year => {
        return {
          label: localFormatYear ? localFormatYear({ year }, { y: year }) : year,
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
              months = months.filter(month => filterMonth({ year, month }) !== false)
            }
            return [months.map(month => {
              return {
                label: localFormatMonth ? localFormatMonth({ year, month }, { y: year, m: month }) : month,
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
                    days = days.filter(day => filterDay({ year, month, day }) !== false)
                  }
                  return [days.map(day => {
                    return {
                      label: localFormatDay ? localFormatDay({ year, month, day }, { y: year, m: month, d: day }) : day,
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
        localFormatHour,
        localFormatMinute,
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
              hours = hours.filter(hour => filterHour({ session: sessionValue, hour: hour || 12 }) !== false)
            }
            return [hours.map(hour => {
              const realHour = hour || 12
              return {
                label: localFormatHour ? localFormatHour({ hour: realHour }, { h: realHour }) : realHour,
                value: realHour,
                children: (() => {
                  let minutes = RANGE_60
                  if (filterMinute) {
                    minutes = minutes.filter(minute => filterMinute({ session: sessionValue, hour: realHour, minute }) !== false)
                  }
                  return [minutes.map(minute => {
                    return {
                      label: localFormatMinute ? localFormatMinute({ hour: realHour, minute }, { h: realHour, i: minute }) : minute,
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
        hours = hours.filter(hour => filterHour({ hour }) !== false)
      }
      return hours.map(hour => {
        return {
          label: localFormatHour ? localFormatHour({ hour }, { h: hour }) : hour,
          value: hour,
          children: (() => {
            let minutes = RANGE_60
            if (filterMinute) {
              minutes = minutes.filter(minute => filterMinute({ hour, minute }) !== false)
            }
            return [minutes.map(minute => {
              return {
                label: localFormatMinute ? localFormatMinute({ hour, minute }, { h: hour, i: minute }) : minute,
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
        localFormatSecond
      } = this
      let seconds = RANGE_60
      if (filterSecond) {
        seconds = seconds.filter(second => filterSecond({ second }) !== false)
      }
      return seconds.map(second => {
        return {
          label: localFormatSecond ? localFormatSecond({ second }, { s: second }) : second,
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
