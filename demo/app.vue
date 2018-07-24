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
    <hr />
    <l-input clearable type="textarea" placeholder="helllo" v-model="inputText" />
    <l-image circle src="https://avatars0.githubusercontent.com/u/13151189?s=40&v=4" />
    <l-action-bar borderless>
      合计：¥20.00
      <l-ActionBarButton type="warning" @click="w.alert(111)">
        加入购物车
      </l-ActionBarButton>
      <l-ActionBarButton type="danger" @click="w.alert(111)">
        立即购买
      </l-ActionBarButton>
    </l-action-bar>
  </div>
</template>

<script>
export default {
  name: 'app',

  data: () => ({
    w: window,
    chosenValue: 1,
    chosenValueAgree: false,
    inputText: 'hello'
  })
}
</script>

<style>
body {
  font-size: 30px;
}
</style>
