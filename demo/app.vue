<template>
  <div>
    hello
    <l-button type="primary" shape="circle" mini>
      X
    </l-button>
    <l-button type="danger" shape="square" mini>
      返回
    </l-button>
    <hr />
    <l-choose shape="square" v-model="chosenValue" :value="[2]" />
    <l-choose v-model="chosenValue" :value="{}" />
    <l-choose v-model="chosenValue" value="8999">
      {{ chosenValue }}
      4
    </l-choose>
    <l-choose shape="circle" v-model="chosenValueAgree" :value="false" />
  </div>
</template>

<script>
export default {
  data: () => ({
    w: window,
    chosenValue: 1,
    chosenValueAgree: false
  })
}
</script>
