<template>
  <div :class="_['picker-view']">
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
            :options="swiperOptions"
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
import { fill } from 'lodash'
import { createComponent, parseCSSUnit } from '../_utils'
import { normalizeData, groupData } from './_utils'
import Carousel from '../Carousel/Carousel.vue'
import CarouselItem from '../Carousel/CarouselItem.vue'

export default createComponent({
  name: 'PickerView',

  components: { Carousel, CarouselItem },

  props: {
    value: {
      type: Array,
      default: () => [],
      transform: value => value.slice(),
      on: {
        receive() {
          // todo:当 value 由上层组件改变时
          // this.selectedIndexes = value.map((item, index) => {
          // })
        }
      }
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
    preData: {
      type: Array,
      default: () => []
    },
    postData: {
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
    caption: [String, Number, Array]
  },

  data: () => ({
    localData: [],
    parentIndexes: [],
    selectedIndexes: []
  }),

  computed: {
    swiperOptions() {
      return {
        freeMode: true,
        freeModeSticky: true,
        slideToClickedSlide: true,
        freeModeMomentumRatio: 0.6,
        freeModeMomentumVelocityRatio: 0.6,
        freeModeMinimumVelocity: 0.1,
        freeModeMomentumBounceRatio: 2
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
        const { groupedData, parentIndexes, selectedIndexes } = groupData(
          normalizeData([
            ...this.preData,
            ...data,
            ...this.postData
          ]),
          this.value
        )
        this.localData = groupedData
        this.parentIndexes = parentIndexes
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
      return this.handleChange(groupIndex, selectedIndex)
    },
    handleChange(groupIndex, selectedIndex) {
      const localValue = this.localValue
      const localData = this.localData
      const parentIndexes = this.parentIndexes
      const currentGroup = localData[groupIndex]
      const selectedItem = currentGroup[selectedIndex]
      if (!selectedItem) return
      localValue[groupIndex] = selectedItem.value
      this.selectedIndexes.splice(groupIndex, 1, selectedIndex)

      let _groupIndex = groupIndex + 1
      let _shouldReplaceCount = 0
      while (parentIndexes[_groupIndex] !== undefined && (parentIndexes[_groupIndex] > parentIndexes[groupIndex])) {
        _shouldReplaceCount++
        _groupIndex++
      }

      if (selectedItem.children) {
        const childrenCount = selectedItem.children.length
        this.localData.splice(groupIndex + 1, _shouldReplaceCount, ...selectedItem.children)
        this.parentIndexes.splice(groupIndex + 1, _shouldReplaceCount, ...fill(Array(childrenCount), groupIndex))
        this.$nextTick(() => {
          for (let i = 0; i < childrenCount; i++) {
            const nextGroupIndex = groupIndex + i + 1
            const nextGroup = this.$refs.groups[nextGroupIndex]
            if (nextGroup && nextGroup.swiper) {
              nextGroup.swiper.update()
              this.handleChange(nextGroupIndex, nextGroup.swiper.realIndex) // 触发子选项
            }
          }
        })
      } else {
        this.parentIndexes.splice(groupIndex + 1, _shouldReplaceCount)
        this.localData.splice(groupIndex + 1, _shouldReplaceCount)
        this.sendValue(localValue.slice(0, this.groupCount))
        this.updateDetail()
      }
    },
    update() {
      const groups = this.$refs.groups
      groups && groups.forEach(group => {
        group.swiper.update()
      })
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/PickerView.module.styl" module />
