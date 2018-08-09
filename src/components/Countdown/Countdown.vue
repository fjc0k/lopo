<template>
  <div :class="_.countdown">
    <slot v-bind="diff" :pad="pad">
      {{
        pad(diff.days)
      }}天{{
        pad(diff.hours)
      }}时{{
        pad(diff.minutes)
      }}分{{
        pad(diff.seconds)
      }}秒
    </slot>
  </div>
</template>

<script>
import { parse, differenceInSeconds } from 'date-fns'
import { createComponent } from '../_utils'
import { clearInterval } from 'timers'

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

  methods: {
    pad(num) {
      return num < 10 ? `0${num}` : num
    },
    update() {
      const diff = Math.abs(differenceInSeconds(this.localTime, new Date()))
      const days = Math.floor(diff / 60 / 60 / 24)
      const hours = Math.floor((diff / 60 / 60) % 24)
      const minutes = Math.floor((diff / 60) % 60)
      const seconds = diff % 60
      this.diff = { days, hours, minutes, seconds }
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(this.timer)
        this.$emit('end')
      }
    }
  },

  beforeMount() {
    this.update()
    this.timer = setInterval(this.update, 1000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  }
})
</script>

<style lang="stylus" src="../_styles/components/Countdown.styl" module />
