<template>
  <div :class="[_.price, deleted && _.deleted]">
    <div :class="[_.symbol, _[symbolPosition]]">{{ symbol }}</div>
    <div :class="_.integer">{{ localValue[0] }}</div>
    <div :class="_.point">.</div>
    <div :class="[_.decimal, _[decimalSize]]">{{ localValue[1] }}</div>
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
        const { decimal: decimalPlaces } = this
        const [integer, decimal = '00'] = String(value).split('.')
        return [
          integer,
          decimal.length >= decimalPlaces
            ? decimal.substr(0, decimalPlaces)
            : padEnd(decimal, decimalPlaces, '0')
        ]
      }
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
  }
})
</script>

<style lang="stylus" src="../_styles/components/Price.styl" module />
