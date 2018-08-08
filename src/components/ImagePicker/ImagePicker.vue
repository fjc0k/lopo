<template>
  <div :class="_.picker">
    <div :class="_.list" v-for="(list, listIndex) in lists" :key="listIndex">
      <div :class="_.item" v-for="(item, itemIndex) in list" :key="itemIndex">
        <div :class="[_.content, _.select]" v-if="item === IMAGE_SELECTOR">
          <Icon :class="_.add" name="lopo-plus" />
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
            name="lopo-cross"
            @click.native="handleRemoveClick(item, (listIndex * cols) + itemIndex)"
          />
          <div
            :class="[_.content, _.image]"
            :style="{
              backgroundImage: `url(${item.url})`,
              transform: `rotate(${item.rotation}deg)`
            }"
            @click="handleImageClick(item, (listIndex * cols) + itemIndex)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint max-nested-callbacks: 0 */
import { toArray } from 'lodash'
import { createComponent, chunk } from '../_utils'
import { getOrientation, getRotation } from './_utils'
import Icon from '../Icon/Icon.vue'

const IMAGE_SELECTOR = 0

export default createComponent({
  name: 'ImagePicker',

  components: { Icon },

  model: {
    prop: 'files',
    event: 'input'
  },

  props: {
    files: {
      type: Array,
      default: () => []
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
    }
  },

  data: () => ({ IMAGE_SELECTOR }),

  computed: {
    lists() {
      const { cols, disabled } = this
      const items = [
        ...this.localFiles,
        ...(disabled ? [] : [IMAGE_SELECTOR])
      ]
      return chunk(items, cols)
    }
  },

  methods: {
    addImage(image) {
      const { localFiles } = this
      const files = localFiles.slice()
      files.push(image)
      this.$emit('add', image)
      this.$emit('change', files, localFiles)
      this.sendFiles(files)
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
      const { localFiles } = this
      const files = localFiles.slice()
      files.splice(index, 1)
      this.$emit('remove', image, index)
      this.$emit('change', files, localFiles)
      this.sendFiles(files)
    },
    handleInputChange({ target: { files } }) {
      toArray(files).forEach(this.parseFile)
    },
    handleImageClick(image, index) {
      this.$emit('image-click', image, index)
    }
  }
})
</script>

<style lang="stylus" src="../_styles/components/ImagePicker.styl" module />
