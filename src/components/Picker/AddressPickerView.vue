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
import divisionData from '@lopo/china-division-data'
import { createComponent } from '../_utils'
import PickerView from './PickerView.vue'

export default createComponent({
  name: 'AddressPickerView',

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
      enum: ['district', 'city', 'province']
    },
    filterProvince: Function,
    filterCity: Function,
    filterDistrict: Function,
    mainland: Boolean
  },

  computed: {
    noCity() {
      return this.mode === 'province'
    },
    noDistrict() {
      return this.mode === 'city'
    },
    data() {
      const {
        filterProvince,
        filterCity,
        filterDistrict,
        mainland,
        noCity,
        noDistrict
      } = this
      let data = divisionData
      if (mainland) {
        data = data.filter(([province]) => !/香港|澳门|台湾/.test(province))
      }
      if (filterProvince) {
        data = data.filter(([province]) => filterProvince({ province }))
      }
      return [
        data.map(([province, cities]) => {
          if (!noCity && filterCity) {
            cities = cities.filter(([city]) => filterCity({ province, city }))
          }
          return [
            province,
            noCity ? undefined : [
              cities.map(([city, districts]) => {
                if (!noDistrict && filterDistrict && districts) {
                  districts = districts.filter(([district]) => filterDistrict({ province, city, district }))
                }
                return [city, noDistrict ? undefined : districts && [districts]]
              })
            ]
          ]
        })
      ]
    }
  },

  methods: {
    update() {
      this.$refs.view.update()
    }
  }
})
</script>
