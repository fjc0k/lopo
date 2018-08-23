<script>
import { createComponent, chunk } from '../_utils'
import GridItem from '../GridItem/GridItem.vue'
import Carousel from '../Carousel/Carousel.vue'
import CarouselItem from '../CarouselItem/CarouselItem.vue'

export default createComponent({
  name: 'Grid',

  provide() {
    return {
      Grid: this
    }
  },

  props: {
    cols: {
      numeric: true,
      default: 4
    },
    rows: {
      numeric: true,
      infinite: true,
      default: Infinity
    },
    noBorder: Boolean,
    noDivider: Boolean,
    noVerticalDivider: Boolean,
    noHorizontalDivider: Boolean,
    adaptive: Boolean
  },

  methods: {
    getPages() {
      const { _, cols, rows } = this
      const children = this.$slots.default
      const childrenCount = children.length
      const realRows = Math.ceil(childrenCount / cols)
      const perPage = realRows > rows ? cols * rows : childrenCount
      return chunk(children, perPage, <GridItem noFeedback />).map(grids => {
        return chunk(grids, cols, <GridItem noFeedback />).map((group, index) => (
          <div class={_.group} key={index}>
            {group}
          </div>
        ))
      })
    }
  },

  render() {
    const { _, noBorder } = this
    const pages = this.getPages()
    return pages.length === 1
      ? (
        <div class={[_.grid, noBorder && _.noBorder]}>
          {pages[0]}
        </div>
      )
      : (
        <Carousel autoplay={false}>
          {pages.map((page, index) => (
            <CarouselItem class={[_.grid, noBorder && _.noBorder]} key={index}>
              {page}
            </CarouselItem>
          ))}
        </Carousel>
      )
  }
})
</script>
