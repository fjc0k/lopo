<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe.
        It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides.
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeDefaultUI from 'photoswipe/dist/photoswipe-ui-default'
import { isPlainObject } from 'lodash'
import { createComponent } from '../_utils'

let UID = 0

export default createComponent({
  name: 'ImageViewer',

  hidable: true,

  props: {
    data: {
      type: Array,
      default: () => [],
      transform: data => data.map(item => {
        if (!isPlainObject(item)) {
          item = { url: item }
        }
        item.src = item.src || item.url
        item.w = item.w || item.width || 0
        item.h = item.h || item.height || 0
        return item
      }),
      on: {
        receive(localData) {
          const { pswp } = this
          if (pswp) {
            pswp.items.splice(0, pswp.items.length, ...localData)
            pswp.invalidateCurrItems()
            pswp.updateSize(true)
            pswp.ui.update()
          }
        }
      }
    },
    index: {
      numeric: true,
      default: 0,
      transform: parseInt,
      sync: true,
      on: {
        receive(localIndex) {
          const { pswp } = this
          if (pswp && localIndex > -1 && localIndex < pswp.items.length) {
            pswp.goTo(localIndex)
          }
        }
      }
    },
    history: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({ UID: `image-viewer-${UID++}` }),

  methods: {
    init() {
      if (this.pswp) return
      const pswpElement = this.$el
      const items = this.localData
      const options = {
        index: this.localIndex,
        galleryUID: this.UID,
        history: this.history,
        ...this.options
      }
      const pswp = new PhotoSwipe(pswpElement, PhotoSwipeDefaultUI, items, options)
      pswp.listen('gettingData', function (index, item) {
        if (item.w < 1 || item.h < 1) {
          const img = new Image()
          img.onload = function () {
            item.w = this.width
            item.h = this.height
            pswp.invalidateCurrItems()
            pswp.updateSize(true)
          }
          img.src = item.src
        }
      })
      pswp.listen('afterChange', () => {
        const currentIndex = pswp.getCurrentIndex()
        this.sendIndex(currentIndex)
      })
      pswp.listen('close', () => {
        this.sendVisible(false)
      })
      pswp.init()
      this.pswp = pswp
    }
  },

  created() {
    this.$on('show', () => {
      this.init()
    })
    this.$on('hide', () => {
      if (this.pswp) {
        this.pswp.close()
        this.pswp = null
      }
    })
  },

  beforeDestroy() {
    this.pswp && this.pswp.destroy()
  }
})
</script>

<style src="photoswipe/dist/photoswipe.css" />
<style src="photoswipe/dist/default-skin/default-skin.css" />
<style lang="stylus" src="../_styles/components/ImageViewer.module.styl" module />
