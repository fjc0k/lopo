<script>
import { find } from 'lodash'
import { createComponent } from '../_utils'
import IndexNodes from '../IndexNodes/IndexNodes.vue'
import Carousel from '../Carousel/Carousel.vue'
import CarouselItem from '../CarouselItem/CarouselItem.vue'

export default createComponent({
  name: 'Tabs',

  provide() {
    return {
      Tabs: this
    }
  },

  props: {
    value: {
      type: null,
      default: 0,
      on: {
        receive() {
          this.update()
        }
      }
    }
  },

  data: () => ({ activeIndex: 0 }),

  mounted() {
    this.update()
  },

  methods: {
    update() {
      this.$nextTick(() => {
        const activeVNode = find(this.$children, vnode => vnode.active)
        if (activeVNode) {
          this.activeIndex = activeVNode.index
          activeVNode.scrollIntoView({
            behavior: 'instant'
          })
        }
      })
    }
  },

  render(h) {
    const { _, $slots: { default: children } } = this
    return (
      <div class={_.tabs}>
        <div class={_.header}>
          <IndexNodes nodes={children} />
        </div>
        {h(
          Carousel,
          {
            class: _.body,
            model: {
              value: this.activeIndex,
              callback: index => this.$children[index].handleClick()
            },
            attrs: {
              indicator: false,
              autoplay: false,
              loop: false,
              options: {
                autoHeight: true
              }
            }
          },
          children.map(
            vnode => (
              <CarouselItem class={_.content}>{
                vnode.componentOptions.children.filter(
                  vnode => vnode.data && vnode.data.slot === 'content'
                )
              }</CarouselItem>
            )
          )
        )}
      </div>
    )
  }
})
</script>
