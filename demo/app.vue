<template>
  <div>
    <h3>List</h3>
    <l-list>
      <l-list-item title="姓名" icon="l-sound" extra="18岁" arrow>方剑成</l-list-item>
      <l-list-item title="姓名" icon="l-sound" extra="18岁" arrow>方剑成</l-list-item>
    </l-list>
    <br />
    <l-form labelWidth="3em">
      <l-field label="姓名姓名姓名姓名" icon="l-sound" extra="18岁" arrow>
        <l-input placeholder="输入姓名" />
      </l-field>
      <l-field label="姓名" icon="l-sound" extra="18岁" arrow>方剑成</l-field>
    </l-form>

    <h3>ImagePicker</h3>
    <l-image-picker></l-image-picker>

    <h3>PickAddress</h3>
    <l-pick-address v-model="pickAddr.model.value" :data="AreaData" placeholder="选择地址"></l-pick-address>

    <h3>PickOne</h3>
    <l-pick-one placeholder="选择一个" v-model="pickOne" :data="pickOneData" />

    <h3>Form</h3>
    <l-form v-bind="form" ref="form">
      <l-field label="姓名" prop="name">
        <l-input v-model="form.model.name" />
      </l-field>
    </l-form>
    <l-button @click="$refs.form.validate()">Submit</l-button>
  </div>
</template>

<script>
import AreaData from './areaData'

export default {
  name: 'app',

  data: () => ({
    pickAddr: {
      model: {
        value: []
      }
    },
    AreaData: [],
    pickOne: 2,
    pickOneData: [['二', 2], 3, 4, 5],
    form: {
      model: {
        name: ''
      },
      rules: {
        name: [
          {
            min: 1,
            message: '大于1个'
          },
          {
            max: 20,
            message: '大于20'
          }
        ]
      }
    }
  }),

  mounted() {
    setTimeout(() => {
      this.AreaData = AreaData
    }, 2000)
  }
}
</script>

<style>
body {
  font-size: 30px;
  background: #eeeef2;
  margin: 20px;
  padding: 0;
}
</style>
