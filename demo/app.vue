<template>
  <div>
    <h3>Input</h3>
    <l-input type="digital" placeholder="输入数字" />

    <h3>Choose</h3>
    <l-choose
      v-model="chosenValue"
      :value="{ id: 1, x: '4222' }"
      :primaryKey="({ id, x }) => +id + +x"
    >1</l-choose>
    <l-choose
      v-model="chosenValue"
      :value="{ id: '1', x: 4 }"
      :primaryKey="({ id, x }) => +id + +x"
    >1+</l-choose>
    <l-choose
      v-model="chosenValue"
      :value="{ id: 2, d: 99 }"
      primaryKey="id"
    >2</l-choose>
    <l-choose
      block
      v-model="chosenValue"
      :value="{ id: 2 }"
      primaryKey="id"
    >2+</l-choose>
    <hr />
    <l-choose
      block
      v-model="chosenValue"
      :value="{ id: 2 }"
      primaryKey="id">
      <div slot="view" slot-scope="{ chosen }" :chosen="chosen">
        <l-button :type="chosen ? 'primary' : 'default'">hello</l-button>
      </div>
    </l-choose>

    <h3>VueRouter</h3>
    <l-button mini @click="$router.push('/')">/</l-button>
    <l-button mini @click="$router.push('/foo')">/foo</l-button>
    <l-button mini @click="$router.push('/bar')">/bar</l-button>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <h3>Popover</h3>
    <l-input v-model="popoverMessage" />
    <l-spacing x="md" betweenX>
      <l-tip message="点击切换隐藏" placement="top-start" visible :closable="false">
        <l-choose v-model="popoverVisible">visible</l-choose>
      </l-tip>
      <l-choose v-model="popoverPlacement" value="top">top</l-choose>
      <l-choose v-model="popoverPlacement" value="bottom">bottom</l-choose>
      <l-choose v-model="popoverPlacement" value="bottom-end">bottom-end</l-choose>
    </l-spacing>
    <br />
    <br />
    <l-tip :placement="popoverPlacement" :message="popoverMessage" v-model="popoverVisible">
      <l-button>删除21</l-button>
    </l-tip>
    <!-- <l-tip placement="right" message="点击了解更多~" visible>
      <l-button mini>删除1</l-button>
    </l-tip> -->

    <h3>Form</h3>
    <l-spacing>
      <l-form v-bind="form1">
        <l-field label="姓名" desc="edk" prop="name" extra="@163.com">
          <l-input v-model="form1.model.name" placeholder="输入你的姓名"></l-input>
        </l-field>
        <l-field label="电话号码" icon="l-star-fill" prop="phone">
          <l-input v-model="form1.model.phone" placeholder="输入你的电话号码"></l-input>
          <l-button mini type="primary" slot="extra">发送验证码</l-button>
        </l-field>
        <l-field label="年龄" align="right" prop="age" multipleLine>
          <l-input v-model="form1.model.age" type="textarea" rows="2" placeholder="年龄"></l-input>
        </l-field>
        <l-field prop="id">
          <div slot="label">身份证号</div>
          <l-input v-model="form1.model.id" type="textarea" rows="1" placeholder="身份证号"></l-input>
        </l-field>
        <l-field label="是否开启">
          <l-switch />
        </l-field>
        <l-field label="支付方式" multipleLine>
          <l-spacing y="sm" betweenY>
            <l-choose block v-model="form1.model.gender" value="alipay">微信支付</l-choose>
            <l-choose block v-model="form1.model.gender" value="male">
              支付宝 <l-badge text="红包" />
            </l-choose>
            <l-choose block v-model="form1.model.gender" value="female">余额支付</l-choose>
          </l-spacing>
        </l-field>
        <l-field label="支付方式" align="right">
          <l-spacing x="sm" betweenX>
            <l-choose v-model="form1.model.gender" value="male">微信支付</l-choose>
            <l-choose v-model="form1.model.gender" value="female">余额支付</l-choose>
          </l-spacing>
        </l-field>
        <!-- <l-field label="生日" align="right" arrow>
          <l-pick-date
            visibleItemCount="9"
            :caption="['年', '月', '日']"
            v-model="pickDate"
            placeholder="选择日期"
            :format="([year, month, day]) => `${year}年${month}月${day}日`"
            :formatYear="({ year }) => year === 2018 ? '今年' : year">
          </l-pick-date>
        </l-field>
        <l-field label="城市" align="right" arrow>
          <l-pick-one
            v-model="form1.model.city"
            placeholder="选择一个你最喜欢的城市"
            :data="['北京', '上海', '成都', '贵阳', '大连', '北海道', '拉萨']"
            :postData="[['d', 'd']]"
          />
        </l-field> -->
      </l-form>
    </l-spacing>

    <h3>Spacing</h3>
    <l-spacing x="md" y="lg" left="lg">
      <div>hello</div>
      <div>world</div>
    </l-spacing>

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
              confirmText: '我知道了',
              on: {
                confirm: () => {
                  w.alert('ok')
                }
              }
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
        亲亲我的宝贝13
      </l-preview-item>
    </l-preview>

    <h3>Divider</h3>
    <l-spacing y="xl">
      <l-divider type="dotted">
        完
      </l-divider>
      <l-divider type="dashed">
        到底了
      </l-divider>
      <l-divider full>
        没有了
      </l-divider>
    </l-spacing>

    <h3>Rate</h3>
    <l-rate />

    <h3>Tabs</h3>
    <!-- <l-tabs value="消消乐">
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
    </l-tabs> -->

    <h3>Counter</h3>
    <l-card>
      <l-counter disableInput min="-21" max="15" step="2" />
    </l-card>

    <h3>Card</h3>
    <l-card title="明天" square>
      千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。
    </l-card>

    <h3>Switch</h3>
    <l-switch />, <l-switch style="color:red;" />

    <h3>Toast</h3>
    <l-button mini @click="handleLoadingClick">Loading</l-button>,
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
    <l-spacing y="md">
      <l-button @click="viewerVisible = !viewerVisible">Show</l-button>
      <l-button @click="$imageViewer(viewerList, { index: 2 })">Show $imageViewer</l-button>
      <l-image-viewer :history="false" :data="viewerList" :index.sync="viewerIndex" v-model="viewerVisible" />
    </l-spacing>

    <!-- <h3>PickAddress</h3>
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
    ]" :format="value => value.join('-')" title="选择收货地址" placeholder="选择收货地址" /> -->

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
console.log(cdd, 'dddd')
// const ps = ['云南', '贵州', '山东', '浙江', '上海', '台湾']
export default {
  name: 'app',

  data: () => ({
    popoverVisible: false,
    popoverPlacement: 'top',
    popoverMessage: 'hello3',
    chosenValue: [],
    form1: {
      model: {
        name: '',
        phone: '',
        age: '',
        id: '',
        gender: 'male',
        city: ''
      },
      rules: {
        name: { required: true, message: '姓名不能为空' },
        phone: { required: true, type: 'mobile', message: '电话号码有误' },
        age: { required: true, min: 10, max: 20, message: '年龄应介于10到20岁之间' },
        id: { type: 'id', message: '身份证号有误' }
      }
    },
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
    chosenValueAgree: false,
    inputText: 'hello'
  }),

  methods: {
    handleLoadingClick() {
      this.$loading('加载中', 200)
        .then(loading => {
          setTimeout(() => {
            loading.hide()
          }, 100)
        })
    },
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
  margin: 20px;
  padding: 0;
}
</style>
