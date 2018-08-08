<template>
  <div>
    hello
    <l-button shape="circle" mini>
      <l-icon name="github" />
    </l-button>
    <l-carousel :indicator="true" loop v-model="slideIndex">
      <l-carousel-item to="http://baidu.com" image="https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png"></l-carousel-item>
      <l-carousel-item image="https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png"></l-carousel-item>
    </l-carousel>
    <hr>
    <l-image-picker v-model="imagePickerFiles" cols="5"></l-image-picker>
    <hr>
    <l-sheet
      v-model="sheetVisible"
      :maskClosable="false"
      noCancel
      title="明天会更好明天会更好明天会更好明天会更好明天会更好"
      desc="得得陇望蜀得陇望蜀得陇望蜀得陇望蜀得陇望蜀得陇望蜀得陇望蜀得陇望蜀陇望蜀">
      fff
    </l-sheet>
    <l-picker-view
      v-model="pickerValue"
      v-bind="picker">
    </l-picker-view>
    <hr>
    <!-- {{ pickerValue2 }}
    <hr>
    <l-picker-view
      v-model="pickerValue2"
      v-bind="picker2"
      cascaded>
    </l-picker-view> -->
    <hr>
    <l-date-picker-view
      v-model="pickerValue3"
      v-bind="picker3">
    </l-date-picker-view>
    <hr>
    <l-switch v-model="switchValue" disabled />
    <l-rate value="3" count="10" />
    <l-button type="danger" shape="square" mini @click="sheetVisible = true">
      返回
    </l-button>
    <l-button plain type="danger" mini @click="sheetVisible = true">
      返回
    </l-button>
    <l-button shape="square" @click="sheetVisible = true">
      返回
    </l-button>
    <l-button noBorder plain type="primary" @click="sheetVisible = true">
      返回
    </l-button>
    <hr />
    <l-card title="个人信息" square>
      公众号广告：微信公众号广告是基于微信公众平台生态，以类似公众号文章内容的形式在包括文章底部、视频贴片和互选等广告资源位进行展示的内容广告。
    </l-card>
    <hr />
    <l-list >
      <l-list-item tappable>
        <l-image slot="icon" style="width:24px"  src="https://avatars0.githubusercontent.com/u/13151189?s=40&v=4" />
        hello
      </l-list-item>
      <l-list-item icon="lopo-fail" title="已验证" extra="是"></l-list-item>
      <l-list-item title="姓名" isLink desc="hello" extra="方剑成">姓名</l-list-item>
      <l-list-item title="年龄" extra="world">
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

    <l-toast :visible="false" type="loading"  maskClosable>
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
const ps = ['云南', '贵州', '山东', '浙江', '上海', '台湾']
export default {
  name: 'app',

  data: () => ({
    imagePickerFiles: [],
    pickerValue3: [2021, 3, 5],
    picker3: {
      mode: 'datetime',
      caption: ['年', '月', '日', '时', '分'],
      /*
       * formatYear: 'yy 年',
       * formatMonth: 'm 月',
       * formatDay: 'd 日',
       * formatHour: 'h 时',
       * formatMinute: 'i 分',
       */
      startDate: '2018-9-4',
      filterYear: ({ year }) => year % 4,
      filterHour: ({ hour }) => hour % 5 === 0,
      filterMinute: ({ minute }) => minute % 15 === 0
      /*
       * filterMonth: ({ month }) => month % 3,
       * filterDay: ({ day }) => day > 20
       */
    },
    pickerValue: ['四川省', 0, 'dd', 'ii', 'xx2'],
    picker: {
      data: [
        ps.map(p => `${p}${1}`),
        ps.map((p, index) => ({
          label: `${p}${2}`,
          value: `${p}${2}`,
          children: [
            ps.slice(0, index + 1).map(p => [
              `${p}${21}-${index}`,
              `${p}${21}-${index}`
            ])
          ]
        })),
        ps.map((p, index) => ({
          label: `${p}${3}`,
          value: `${p}${3}`,
          children: [
            ps.slice(0, index + 1).map(p => `${p}${31}-${index}`),
            ps.slice(0, index + 1).map(p => `${p}${32}-${index}`)
          ]
        }))
      ]
    },
    pickerValue2: ['云南省2', '镇雄县2'],
    picker2: {
      visibleItemCount: 3,
      data: [
        ['云南省', '云南省', { children: [
          ['镇雄县', '镇雄县'],
          ['乌峰镇', '乌峰镇'],
          ['罗坎镇', '罗坎镇']
        ] }],
        ['云南省2', '云南省2', { children: [
          ['镇雄县2', '镇雄县2'],
          ['镇雄县3', '镇雄县3', { children: [
            ['镇雄县', '镇雄县'],
            ['乌峰镇', '乌峰镇'],
            ['罗坎镇', '罗坎镇']
          ] }]
        ] }],
        ['云南省3', '云南省3', { children: [
          ['镇雄县2', '镇雄县2'],
          ['镇雄县3', '镇雄县3', { children: [
            ['镇雄县', '镇雄县'],
            ['乌峰镇', '乌峰镇'],
            ['罗坎镇', '罗坎镇']
          ] }]
        ] }]
      ],
      caption: ['省', '市', '县'],
      divider: ':'
    },
    sheetVisible: false,
    slideIndex: 1,
    switchValue: true,
    w: window,
    chosenValue: 1,
    chosenValueAgree: false,
    inputText: 'hello'
  }),

  methods: {
    handleClick() {
      const l = this.$toast.fail('请输入正确的手机号码')
      setTimeout(() => {
        l.hide()
      }, 5000)
    }
  }
}
</script>

<style>
body {
  font-size: 30px;
}
</style>
