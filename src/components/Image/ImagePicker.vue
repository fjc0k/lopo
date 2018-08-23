<template>
  <div :class="_.imagePicker">
    <div :class="_.list" v-for="(list, listIndex) in lists" :key="listIndex">
      <div :class="_.item" v-for="(item, itemIndex) in list" :key="itemIndex">
        <div :class="[_.content, _.select]" v-if="item === IMAGE_SELECTOR">
          <Icon :class="_.add" name="l-plus" />
          <input
            :class="_.input"
            type="file"
            :accept="accept"
            :multiple="multiple"
            @change="handleInputChange"
          />
        </div>
        <template v-else-if="item">
          <Icon
            :class="_.remove"
            name="l-close"
            @click.native="handleRemoveClick(item, (listIndex * cols) + itemIndex)"
          />
          <XImage
            :class="_.content"
            :fit="fit"
            :src="item.url"
            :style="{
              transform: `rotate(${item.rotation}deg)`
            }"
            @click.native="handleImageClick(item, (listIndex * cols) + itemIndex)"
          />
        </template>
      </div>
    </div>
    <ImageViewer
      v-model="preview"
      :data="localValue"
      :index="clickedImageIndex"
    />
  </div>
</template>

<script>
/* eslint max-nested-callbacks: 0 */
import { isPlainObject, toArray } from 'lodash'
import { createComponent, chunk } from '../_utils'
import { getOrientation, getRotation } from './_utils'
import Icon from '../Icon/Icon.vue'
import XImage from '../Image/Image.vue'
import ImageViewer from '../ImageViewer/ImageViewer.vue'

const IMAGE_SELECTOR = 0

export default createComponent({
  name: 'ImagePicker',

  components: { Icon, XImage, ImageViewer },

  props: {
    value: {
      type: Array,
      default: () => [],
      transform: files => files.map(file => {
        return isPlainObject(file) ? file : { url: file }
      })
    },
    disabled: Boolean,
    multiple: Boolean,
    accept: {
      type: String,
      default: 'image/gif,image/jpeg,image/jpg,image/png'
    },
    cols: {
      numeric: true,
      default: 4
    },
    fit: {
      type: String,
      enum: ['cover', 'contain', 'fill']
    }
  },

  data: () => ({
    IMAGE_SELECTOR,
    clickedImageIndex: 0,
    preview: false
  }),

  computed: {
    lists() {
      const { cols, disabled } = this
      const items = [
        ...this.localValue,
        ...(disabled ? [] : [IMAGE_SELECTOR])
      ]
      return chunk(items, cols)
    }
  },

  methods: {
    addImage(image) {
      const { localValue } = this
      const files = localValue.slice()
      files.push(image)
      this.$emit('add', image)
      this.$emit('change', files, localValue)
      this.sendValue(files)
    },
    parseFile(file, index) {
      const reader = new FileReader()
      reader.onload = e => {
        const dataURL = e.target.result
        if (!dataURL) {
          this.$emit('fail', file, index)
          return
        }
        let orientation = 1
        getOrientation(file, res => {
          if (res > 0) {
            orientation = res
          }
          this.addImage({
            url: dataURL,
            rotation: getRotation(orientation),
            orientation,
            file
          })
        })
      }
      reader.readAsDataURL(file)
    },
    handleRemoveClick(image, index) {
      const { localValue } = this
      const files = localValue.slice()
      files.splice(index, 1)
      this.$emit('remove', image, index)
      this.$emit('change', files, localValue)
      this.sendValue(files)
    },
    handleInputChange({ target: { files } }) {
      toArray(files).forEach(this.parseFile)
    },
    handleImageClick(image, index) {
      this.clickedImageIndex = index
      this.preview = true
      this.$emit('image-click', image, index)
    }
  }
})
</script>

