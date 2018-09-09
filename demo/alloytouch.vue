<template>
  <div>
    <h3>Carousel</h3>
    <h5>X1</h5>
    <l-carousel :index="1">
      <img style="height:200px;width:88%;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg" />
      <img style="height:200px;width:88%;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg" />
      <img style="height:200px;width:88%;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg" />
      <img style="height:200px;width:88%;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg" />
    </l-carousel>
    <h5>X2</h5>
    <l-carousel>
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg" />
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg" />
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg" />
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg" />
    </l-carousel>
    <h5>Y</h5>
    <l-carousel direction="vertical" style="height:200px;">
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg" />
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg" />
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg" />
      <img style="height:200px;" src="http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg" />
    </l-carousel>

    <l-button @click="total += 10">total += 10</l-button>
    <h3>Y</h3>
    <l-scroll sticky style="height:150px" @touchEnd="handleTouchEnd">
      <div class="item" v-for="i in total" :key="i">
        {{ i + ' of ' + total }}
      </div>
    </l-scroll>
    <h3>X</h3>
    <l-scroll sticky dir="x" style="height:250px" @touchEnd="handleTouchEnd">
      <div class="item-x" v-for="i in total" :key="i">
        {{ i + ' of ' + total }}
      </div>
    </l-scroll>
  </div>
</template>

<script>
export default {
  data: () => ({
    total: 20
  }),

  methods: {
    handleTouchEnd() {
      // console.log(arguments, 1)
    }
  }
}
</script>

<style scoped>
/* .wrapper {
  overflow: hidden;
}
.list {
  float: left;
  background: gray;
  white-space: nowrap;
} */
.item {
  display: flex;
  align-items: center;
}

.item-x {
  width: 50%;
  height: 200px;
  border: 1px dashed #ececec;
  box-sizing: border-box;
}
</style>
