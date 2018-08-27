<template>
  <div>
    bar
    <l-button mini @click="handleClick">open Dialog</l-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log(this.$dialog)
      this.$dialog({ message: 'bar Dialog' })
    }
  }
}
</script>
