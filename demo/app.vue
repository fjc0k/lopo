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
    <l-list >
      <l-list-item tappable>
        <l-image slot="icon" style="width:24px"  src="https://avatars0.githubusercontent.com/u/13151189?s=40&v=4" />
        hello
      </l-list-item>
      <l-list-item icon="lopo-fail" title="已验证" extra="是"></l-list-item>
      <l-list-item  title="姓名" isLink desc="hello" extra="方剑成">姓名</l-list-item>
      <l-list-item title="年龄" extra="ffffffffffffdddddddddddddddffddddddddddddddd">
      </l-list-item>
      <l-list-item title="姓名">
        <l-input clearable placeholder="输入您的姓名" v-model="inputText" />
      </l-list-item>

    </l-list>
    <hr />
    <l-choose shape="square" v-model="chosenValue" :value="[2]" />
    <l-choose v-model="chosenValue" :value="{}" />
    <l-choose v-model="chosenValue" value="8999">
      {{ chosenValue }}
      4
      <l-icon name="loading" />
    </l-choose>
    <l-choose shape="circle" v-model="chosenValueAgree" :value="false" />
    <hr />
    <l-input clearable type="textarea" placeholder="hello world" v-model="inputText" />
    <l-image circle src="https://avatars0.githubusercontent.com/u/13151189?s=40&v=4" />

    <l-toast :visible="true" type="loading"  maskClosable>
      确认成功
    </l-toast>
    <l-action-bar>
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
