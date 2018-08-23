<template>
  <div :class="[_.price, deleted && _.deleted]">
    <div :class="[_.symbol, _[symbolPosition]]">{{ symbol }}</div>
    <div :class="_.integer">{{ localValue[0] }}</div>
    <div :class="_.point">.</div>
    <div :class="[_.decimal, _[decimalSize]]">{{ localValue[1] }}</div>
    <template v-if="localMax">
      <div :class="_.hyphen">{{ hyphen }}</div>
      <div :class="_.integer">{{ localMax[0] }}</div>
      <div :class="_.point">.</div>
      <div :class="[_.decimal, _[decimalSize]]">{{ localMax[1] }}</div>
    </template>
  </div>
</template>

<script>
import { padEnd } from 'lodash'
import { createComponent } from '../_utils'

export default createComponent({
  name: 'Price',

  props: {
    value: {
      numeric: true,
      required: true,
      transform(value) {
        return this.parsePrice(value)
      }
    },
    max: {
      numeric: true,
      transform(value) {
        return this.parsePrice(value)
      }
    },
    hyphen: {
      type: String,
      default: '-'
    },
    symbol: {
      type: String,
      default: '¥'
    },
    symbolPosition: {
      type: String,
      enum: ['middle', 'top', 'bottom']
    },
    decimal: {
      numeric: true,
      default: 2
    },
    decimalSize: {
      type: String,
      enum: ['normal', 'small']
    },
    deleted: Boolean
  },

  methods: {
    parsePrice(value) {
      const { decimal: decimalPlaces } = this
      const [integer, decimal = '00'] = String(value).split('.')
      return [
        integer <= 0 ? 0 : integer,
        decimal.length >= decimalPlaces
          ? decimal.substr(0, decimalPlaces)
          : padEnd(decimal, decimalPlaces, '0')
      ]
    }
  }
})
</script>
