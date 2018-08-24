<template>
  <div>
    <h3>Dialog</h3>
    <l-button mini @click="dialogVisible = true">Open Dialog</l-button>
    <l-dialog
      type="prompt"
      title="弹窗标题"
      confirmText="我知道了"
      :autoClose="false"
      v-model="dialogVisible"
      @confirm="done => {
        $loading('确认中...').then(loading => {
          w.setTimeout(() => {
            loading.hide()
            $confirm({
              title: '确认失败',
              message: '请确定你的姓名、电话等信息是否正确~',
              confirmText: '我知道了'
            })
          }, 2000)
        })
      }">
      弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
    </l-dialog>

    <h3>Preview</h3>
    <l-preview>
      <l-preview-item title="购买数量">
        21
      </l-preview-item>
      <l-preview-item title="个性签名">
        千山鸟飞绝万径人踪灭孤舟蓑笠翁独钓寒江雪
      </l-preview-item>
      <l-preview-item title="收货地址">
        东大43号 416
      </l-preview-item>
      <l-preview-divider />
      <l-preview-item title="快递公司">
        顺丰快递
      </l-preview-item>
      <l-preview-item title="快递单号">
        33848595850940558
      </l-preview-item>
      <l-preview-divider />
      <l-preview-item title="备注">
        亲亲我的宝贝
      </l-preview-item>
    </l-preview>

    <h3>Divider</h3>
    <l-divider type="dotted">
      完
    </l-divider>
    <l-divider type="dashed">
      到底了
    </l-divider>
    <l-divider full>
      没有了
    </l-divider>

    <h3>Rate</h3>
    <l-rate />

    <h3>Tabs</h3>
    <l-tabs value="消消乐">
      <l-tab :value="tab" v-for="tab in [
        '王者荣耀',
        '英雄联盟',
        '绝地求生',
        '刺激战场',
        '24',
        '消消乐',
        '球球大作战'
      ]" :key="tab">
        {{ tab }}
        <div slot="content">
          {{ tab }}内容
        </div>
      </l-tab>
    </l-tabs>

    <h3>Counter</h3>
    <l-counter readonly min="-21" max="15" step="2" />

    <h3>Card</h3>
    <l-card title="明天" square>
      千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。
    </l-card>

    <h3>Switch</h3>
    <l-switch />, <l-switch style="color:red;" />

    <h3>Toast</h3>
    <l-button mini @click="$toast.loading('加载中...')">Loading</l-button>,
    <l-button mini @click="$toast.success('加载成功')">Success</l-button>,
    <l-button mini @click="$toast.error('加载失败')">Error</l-button>,
    <l-button mini @click="$toast('内容写错了')">Toast</l-button>,
    <l-button mini @click="$toast.top('内容写错了')">Toast Top</l-button>,
    <l-button mini @click="$toast.bottom('内容写错了')">Toast Bottom</l-button>

    <h3>ImagePicker</h3>
    <l-image-picker v-model="viewerList" />

    <h3>Grid</h3>
    <l-grid cols="4" rows="2">
      <l-grid-item icon="lopo-star">课表</l-grid-item>
      <l-grid-item @click.native="w.alert(22)">教室</l-grid-item>
      <l-grid-item>表白墙</l-grid-item>
      <l-grid-item>课表</l-grid-item>
      <l-grid-item>教室</l-grid-item>
      <l-grid-item>表白墙</l-grid-item>
      <l-grid-item icon="lopo-star">课表</l-grid-item>
      <l-grid-item>教室</l-grid-item>
      <l-grid-item>表白墙</l-grid-item>
      <l-grid-item>课表</l-grid-item>
      <l-grid-item>教室</l-grid-item>
    </l-grid>

    <h3>NoticeBar</h3>
    <l-notice-bar to="http://baiu.com">
      千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。
    </l-notice-bar>
    <l-notice-bar closable>
      千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。
    </l-notice-bar>

    <h3 v-hairline.b>Marquee</h3>
    <l-marquee>
      千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。
    </l-marquee>

    <h3>ImageViewer</h3>
    <l-button @click="viewerVisible = !viewerVisible">Show</l-button>
    <l-button @click="$imageViewer(viewerList, { index: 2 })">Show $imageViewer</l-button>
    <l-image-viewer :history="false" :data="viewerList" :index.sync="viewerIndex" v-model="viewerVisible" />

    <h3>PickAddress</h3>
    <l-pick-address
      v-model="pickDddress"
      placeholder="选择地址"
    >
      <div slot="desc">ss</div>
    </l-pick-address>

    <h3>PickDate</h3>
    <l-pick-date
      v-model="pickDate"
      mode="month"
      placeholder="选择日期"
      :format="([year, month]) => `${year}年${month}月`"></l-pick-date>

    <h3>Pick</h3>
    <l-pick :data="[
      ['明天', '今天'],
      ['11点', '12点']
    ]" :format="value => value.join('-')" title="选择收货地址" placeholder="选择收货地址" />

    <h3>Badge</h3>
    <l-badge text="world"></l-badge>
    ,
    <l-badge text="优惠" shape="flat"></l-badge>
    ,
    <l-badge text="限时秒杀" shape="square"></l-badge>
    ,
    <l-badge text="明天" type="primary"></l-badge>
    ,
    <l-badge text="1" type="warning"></l-badge>
    ,
    <l-badge text="01" dot></l-badge>
    ,
    <l-badge>
      <l-icon name="lopo-cross" slot="text" />
    </l-badge>
    ,
    <l-badge text="!">
      <l-button mini>dd</l-button>
    </l-badge>
    <br>
    <l-badge text="world" plain></l-badge>
    ,
    <l-badge text="优惠" shape="flat" plain></l-badge>
    ,
    <l-badge text="限时秒杀" shape="square" plain></l-badge>
    ,
    <l-badge text="明天" type="primary" plain></l-badge>
    ,
    <l-badge text="1" type="warning" plain></l-badge>
    ,
    <l-badge text="01" dot plain></l-badge>
    ,
    <l-badge plain>
      <l-icon name="lopo-cross" slot="text" />
    </l-badge>
    ,
    <l-badge text="!" plain>
      <l-button type="primary" mini @click="w.alert(1)">dd</l-button>
    </l-badge>

    <h3>Price</h3>
    <l-price value="20" symbolPosition="top"></l-price>
    ,
    <l-price max="4.70" value="0.01" decimalSize="small" symbolPosition="bottom"></l-price>
    ,
    <l-price max="40" :value="22.3847848" symbolPosition="bottom"></l-price>
    ,
    <l-price hyphen="~" :value="76.3847848" deleted symbolPosition="bottom" style="font-size:14px" decimalSize="small"></l-price>

    <h3>List</h3>
    <l-list>
      <l-list-item icon="lopo-sound" tappable>
        <l-marquee slot="extra">
          各位同事，明天起不准带宠物进入公司！请自行处理。
        </l-marquee>
      </l-list-item>
      <l-list-item icon="lopo-cross" desc="选择一下">
        你的姓名
        <l-icon name="lopo-right" />
      </l-list-item>
      <l-list-item title="你的姓名" extra="方剑成"></l-list-item>
      <l-list-item title="地址" isLink>
        <l-pick-address
          v-model="pickDddress"
          placeholder="选择地址"
        >
          <div slot="desc">选择正确的收货地址</div>
        </l-pick-address>
      </l-list-item>
    </l-list>

    <l-tab-bar>
      <l-tab-bar-item icon="l-star-fill" :badge="{ text: 5 }">今日新闻</l-tab-bar-item>
      <l-tab-bar-item icon="lopo-cross" v-if="viewerIndex===1">
        <div slot="icon" slot-scope="{ active }">
          {{ active ? '1' : '2' }}
        </div>
      </l-tab-bar-item>
      <l-tab-bar-item icon="lopo-star" activeIcon="lopo-loading" :badge="{ dot: true }">我的收藏</l-tab-bar-item>
    </l-tab-bar>

  </div>
</template>

<script>
import cdd from '@lopo/china-division-data'
console.log(cdd)
// const ps = ['云南', '贵州', '山东', '浙江', '上海', '台湾']
export default {
  name: 'app',

  data: () => ({
    dialogVisible: false,
    viewerVisible: false,
    viewerIndex: 1,
    viewerList: [
      { url: 'http://placekitten.com/g/200/300' },
      { url: 'http://placekitten.com/g/1000/900' },
      { url: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg' },
      'https://placekitten.com/200/286'
    ],
    pickDddress: [],
    pickDate: [],
    pickerVisible: false,
    imagePickerFiles: [],
    pickerValue3: [2021, 3, 5],
    picker3: {
      mode: 'datetime',
      secondSelectable: true,
      caption: ['年', '月', '日', '时', '分', '秒'],
      /*
       * formatYear: 'yy 年',
       * formatMonth: 'm 月',
       * formatDay: 'd 日',
       * formatHour: 'h 时',
       * formatMinute: 'i 分',
       */
      startDate: '2018-9-4',
      filterYear: ({ year }) => year % 4
      // filterHour: ({ hour }) => hour % 5 === 0,
      // filterMinute: ({ minute }) => minute % 15 === 0,
      // filterSecond: ({ second }) => second % 3 === 0
      /*
       * filterMonth: ({ month }) => month % 3,
       * filterDay: ({ day }) => day > 20
       */
    },
    pickerValue: ['四川', '男生'],
    picker: {
      title: '选择你的信息',
      caption: ['省份', '性别', '年龄'],
      data: [
        ['云南', '四川', '贵州', '浙江', ['上海', '上海', [
          ['浦东', '浦西']
        ]], '山东'],
        [
          ['男生', '男生', [
            ['18岁', '20岁', '30岁']
          ]],
          ['女生', '女生', [
            ['21岁', '22岁', '45岁', '80岁']
          ]]
        ]
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
    },
    handleOpenPicker() {
      this.$addressPicker({
        data: cdd,
        mode: 'year',
        formatHour: 'h 时',
        value: ['云南省', '秋'],
        // postData: [
        //   ['春', '夏', '秋', '冬']
        // ],
        startDate: '2017',
        endDate: '2089',
        mainland: true
      }, {
        title: '选择收货地址',
        desc: '暂不支持港澳台'
      })
    }
  }
}
</script>

<style>
body {
  font-size: 30px;
  background: #eeeef2;
  margin: 0;
  padding: 0;
}
</style>
