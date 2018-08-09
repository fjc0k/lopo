<template>
  <div :class="_.countdown">
    <slot v-bind="diff">
      {{ diff.days | padStartWithZero }}天{{ diff.hours | padStartWithZero }}时{{ diff.minutes | padStartWithZero }}分{{ diff.seconds | padStartWithZero }}秒
    </slot>
  </div>
</template>

<script>
import { parse, differenceInSeconds } from 'date-fns'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Countdown',

  props: {
    time: {
      type: [Date, String, Number],
      required: true,
      transform: time => parse(time)
    }
  },

  data: () => ({
    diff: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }),

  filters: {
    padStartWithZero(num) {
      return num < 10 ? `0${num}` : num
    }
  },

  beforeMount() {
    this.update()
    this.timer = setInterval(this.update, 1000)
  },

  methods: {
    pad(num) {
      this.cache = this.cache || Object.create(null)
      if (this.cache) {

      }
    },
    update() {
      const diff = Math.abs(differenceInSeconds(this.localTime, new Date()))
      const days = Math.floor(diff / (3600 * 24))
      const hours = Math.floor((diff - (days * 3600 * 24)) / 3600)
      const minutes = Math.floor(((diff - (days * 3600 * 24) - (hours * 3600))) / 60)
      const seconds = Math.floor(diff - (days * 3600 * 24) - (hours * 3600) - (minutes * 60))
      this.diff = { days, hours, minutes, seconds }
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(this.timer)
        this.$emit('end')
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/Countdown.styl" module />
