<template>
  <div>
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
export default {
  name: 'app',

  data: () => ({
    pickOne: 2,
    pickOneData: [['二', 2], 3, 4, 5],
    form: {
      model: {
        name: '',
        agree: true
      },
      rules: {
        name: [
          {
            max: 5,
            message: '大于5个'
          },
          {
            custom: ({ value }) => {
              console.log(value)
              return value > 20
            },
            message: '大于20'
          }
        ]
      }
    }
  })
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
