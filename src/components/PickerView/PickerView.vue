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
          <!-- // 此处需手动处理 selectedIndexes，故不用 v-model 双向绑定 -->
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
            ref="groups"
            @ready="swiper => handleReady(groupIndex, swiper.realIndex)"
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
/*
 * todo
 * ff
 */

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
      default: () => [],
      transform: value => value.slice()
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
    localData: [],
    selectedIndexes: []
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
    localItemHeight() {
      return parseCSSUnit(this.itemHeight)
    },
    localDivider() {
      const { divider, groupCount } = this
      if (Array.isArray(divider)) {
        return divider.slice(0, groupCount - 1)
      }
      return divider ? fill(Array(groupCount - 1), divider) : []
    },
    localCaption() {
      const { caption, groupCount } = this
      if (Array.isArray(caption)) {
        return caption.slice(0, groupCount)
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
        const { value, cascaded } = this
        data = normalizeData(data, cascaded)

        let localData
        let selectedIndexes

        if (cascaded) { // 级联
          localData = []
          selectedIndexes = []
          let groupIndex = 0
          while (data) {
            localData.push(data)
            const foundIndex = findIndex(data, ['value', value[groupIndex++]])
            selectedIndexes.push(foundIndex === -1 ? 0 : foundIndex)
            data = foundIndex === -1 ? null : data[foundIndex].children
          }
        } else { // 非级联
          localData = data
          selectedIndexes = range(data.length).map(index => {
            if (index in value) {
              const foundIndex = findIndex(localData[index], ['value', value[index]])
              return foundIndex === -1 ? 0 : foundIndex
            }
            return 0
          })
        }

        this.localData = localData
        this.selectedIndexes = selectedIndexes
        this.updateDetail()
      }
    }
  },

  methods: {
    updateDetail() {
      this.$nextTick(() => {
        this.sendDetail(
          this.selectedIndexes.slice(0, this.groupCount).map(
            (itemIndex, groupIndex) => this.localData[groupIndex][itemIndex]
          )
        )
      })
    },
    handleReady(groupIndex, selectedIndex) {
      if (this.cascaded) { // 级联：触发子选项
        this.handleChange(groupIndex, selectedIndex)
      }
    },
    handleChange(groupIndex, selectedIndex) {
      const { localValue, localData, cascaded } = this
      const selectedItem = localData[groupIndex][selectedIndex]
      localValue[groupIndex] = localData[groupIndex][selectedIndex].value
      if (cascaded) { // 级联
        this.selectedIndexes.splice(groupIndex, 1, selectedIndex)
        if (selectedItem.children) {
          this.localData.splice(groupIndex + 1, this.localData.length, selectedItem.children)
          this.$nextTick(() => {
            const nextGroupIndex = groupIndex + 1
            const nextGroup = this.$refs.groups[nextGroupIndex]
            if (nextGroup && nextGroup.swiper) {
              nextGroup.swiper.update()
              this.handleChange(nextGroupIndex, nextGroup.swiper.realIndex) // 触发子选项
            }
          })
        } else {
          // 无子选项的项目就是最后一项，只在最后一项时触发双向绑定
          this.localData.splice(groupIndex + 1)
          this.sendValue(localValue.slice(0, groupIndex + 1))
          this.updateDetail()
        }
      } else { // 非级联
        this.selectedIndexes.splice(groupIndex, 1, selectedIndex)
        this.sendValue(localValue.slice())
        this.updateDetail()
      }
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/PickerView.styl" module />
