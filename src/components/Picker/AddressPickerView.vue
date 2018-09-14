<template>
  <PickerView
    v-model="localValue"
    v-bind="$attrs"
    v-on="$passListeners('input')"
    :data="divisionData"
    ref="view"
  />
</template>

<script>
/* eslint max-nested-callbacks: 0 */
import { createComponent } from '../_utils'
import { normalizeData } from './_utils'
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
    data: {
      type: Array,
      default: () => [],
      transform: normalizeData
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
    divisionData() {
      const {
        localData,
        filterProvince,
        filterCity,
        filterDistrict,
        mainland,
        noCity,
        noDistrict
      } = this

      if (!localData || !localData[0]) return []

      const provinces = [[]]

      localData[0].forEach(province => {
        if (mainland && /香港|澳门|台湾/.test(province.label)) return
        if (filterProvince && filterProvince({ province }) === false) return
        provinces[0].push({
          ...province,
          children: (noCity || !province.children || !province.children[0]) ? undefined : (() => {
            const cities = [[]]
            province.children[0].forEach(city => {
              if (filterCity && filterCity({ province, city }) === false) return
              cities[0].push({
                ...city,
                children: (noDistrict || !city.children || !city.children[0]) ? undefined : (() => {
                  const districts = [[]]
                  city.children[0].forEach(district => {
                    if (filterDistrict && filterDistrict({ province, city, district }) === false) return
                    districts[0].push(district)
                  })
                  return districts
                })()
              })
            })
            return cities
          })()
        })
      })

      return provinces
    }
  },

  methods: {
    update() {
      this.$refs.view.update()
    }
  }
})
</script>
