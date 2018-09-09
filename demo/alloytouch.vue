<template>
  <div>
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
  width: 20%;
  border: 1px dashed #ececec;
  box-sizing: border-box;
}
</style>
