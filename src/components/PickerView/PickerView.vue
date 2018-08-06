<template>
  <div :class="_.view">
    <!-- // 提示 -->
    <div :class="_.caption">
      <template v-for="(caption, groupIndex) in localCaption">
        <div
          :class="_.item"
          :style="styles.caption"
          :key="groupIndex">
          {{ caption }}
        </div>
        <div
          :class="_.item"
          :style="styles.caption"
          :key="`_${groupIndex}`"
          v-if="localDivider[groupIndex]"
        />
      </template>
    </div>
    <!-- // 容器 -->
    <div :class="_.container" :style="styles.container" ref="container">
      <!-- // 遮罩 -->
      <div :class="_.mask" :style="styles.mask" />
      <!-- // 指示器 -->
      <div :class="_.indicator" :style="styles.indicator" />
      <div direction="vertical" :class="_.content">
        <template v-for="(groupData, groupIndex) in localData">
          <Carousel
            :index="selectedIndexes[groupIndex]"
            direction="vertical"
            :autoplay="false"
            :loop="false"
            :indicator="false"
            :swiperOptions="swiperOptions"
            :class="_.group"
            :style="styles.group"
            :key="groupIndex"
            @change="selectedIndex => handleChange(groupIndex, selectedIndex)">
            <CarouselItem
              :class="_.item"
              :style="styles.item"
              v-for="(item, itemIndex) in groupData"
              :key="itemIndex">
              {{ item.label }}
            </CarouselItem>
          </Carousel>
          <div :class="_.divider" :style="styles.divider" :key="`_${groupIndex}`" v-if="localDivider[groupIndex]">
            <span :class="_.wrapper">
              {{ localDivider[groupIndex] }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { fill, range, findIndex } from 'lodash'
import { createComponent, parseCSSUnit } from '../_utils'
import normalizeData from './normalizeData'
import Carousel from '../Carousel/Carousel.vue'
import CarouselItem from '../CarouselItem/CarouselItem.vue'

export default createComponent({
  name: 'PickerView',

  components: { Carousel, CarouselItem },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Array,
      default: () => [],
      sync: true
    },
    data: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: String,
      default: '2em'
    },
    visibleItemCount: {
      numeric: true,
      default: 5
    },
    divider: [String, Number, Array],
    caption: [String, Number, Array],
    cascaded: Boolean
  },

  data: () => ({
    localData: []
  }),

  computed: {
    swiperOptions() {
      return {
        freeMode: true,
        freeModeSticky: true,
        slideToClickedSlide: true,
        freeModeMomentumRatio: 0.6, // Higher value produces larger momentum distance after you release slider
        freeModeMomentumVelocityRatio: 0.6, // Higher value produces larger momentum velocity after you release slider
        freeModeMinimumVelocity: 0.1 // Minimum touchmove-velocity required to trigger free mode momentum
      }
    },
    groupCount() {
      return this.localData.length
    },
    selectedIndexes() {
      const { localValue, localData, groupCount } = this
      const selectedIndexes = range(groupCount).map(index => {
        if (index in localValue) {
          const foundIndex = findIndex(
            localData[index],
            ['value', localValue[index]]
          )
          return foundIndex === -1 ? 0 : foundIndex
        }
        return 0
      })
      if (!this.detailProvided) {
        this.detailProvided = true // eslint-disable-line vue/no-side-effects-in-computed-properties
        this.sendDetail(
          selectedIndexes.map(
            (itemIndex, groupIndex) => localData[groupIndex][itemIndex]
          )
        )
      }
      return selectedIndexes
    },
    localItemHeight() {
      return parseCSSUnit(this.itemHeight)
    },
    localDivider() {
      const { divider, groupCount } = this
      if (Array.isArray(divider)) {
        return divider
      }
      return divider ? fill(Array(groupCount - 1), divider) : []
    },
    localCaption() {
      const { caption, groupCount } = this
      if (Array.isArray(caption)) {
        return caption
      }
      return caption ? fill(Array(groupCount), caption) : []
    },
    styles() {
      const {
        visibleItemCount,
        groupCount,
        localDivider,
        itemHeight,
        localItemHeight: {
          value: pureItemHeight,
          unit
        }
      } = this
      const pickerHeight = `${pureItemHeight * visibleItemCount}${unit}`
      const pickerHalfHeight = `${pureItemHeight * ((visibleItemCount - 1) / 2)}${unit}`
      const groupWidth = `${100 / (groupCount + (localDivider ? localDivider.length : 0))}%`
      return {
        container: {
          height: pickerHeight
        },
        mask: {
          backgroundSize: `100% ${pickerHalfHeight}`
        },
        indicator: {
          height: itemHeight,
          top: pickerHalfHeight
        },
        caption: {
          maxWidth: groupWidth
        },
        group: {
          height: itemHeight,
          maxWidth: groupWidth, // 限制宽度：单行溢出文本显示省略号
          padding: `${pickerHalfHeight} 0` // 上下留白：上下空白区域可滑动
        },
        item: {
          height: itemHeight,
          lineHeight: itemHeight
        },
        divider: {
          maxWidth: groupWidth,
          height: pickerHeight
        }
      }
    }
  },

  watch: {
    data: {
      immediate: true,
      handler(data) {
        const { cascaded, value } = this
        data = normalizeData(data, cascaded)
        let localData
        if (cascaded) {
          localData = [data]
          let _index = 0
          let index
          while (
            data
            && ((index = findIndex(data, ['value', value[_index++]])) > -1)
            && (data = data[index].children)
          ) {
            localData.push(data)
          }
        } else {
          localData = data
        }
        this.localData = localData
      }
    }
  },

  methods: {
    handleChange(groupIndex, selectedIndex) {
      const { localValue, localData, cascaded } = this
      const selectedItem = localData[groupIndex][selectedIndex]
      if (cascaded) {
        if (selectedItem.children) {
          this.localData.splice(groupIndex + 1, this.localData.length, selectedItem.children)
        } else {
          const _localValue = localValue.slice()
          _localValue[groupIndex] = localData[groupIndex][selectedIndex].value
          this.sendValue(_localValue)
        }
      } else {
        const _localValue = localValue.slice()
        _localValue[groupIndex] = localData[groupIndex][selectedIndex].value
        this.sendValue(_localValue)
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/PickerView.styl" module />
