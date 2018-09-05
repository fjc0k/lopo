# 选择 Choose

单选、多选、同意。


## 代码演示

`Choose` 组件根据 `chosenValue` 的值（可使用 `v-model` 双向绑定）来判定单选、多选、同意。

### 单选

设置 `chosenValue` 为**非数组**、**非布尔**的值即表示单选。

<p>
  <l-spacing x="md" betweenX>
    <l-choose v-model="hero" value="鲁班七号">鲁班七号</l-choose>
    <l-choose v-model="hero" value="马可波罗">马可波罗</l-choose>
    <l-choose v-model="hero" value="孙悟空">孙悟空</l-choose>
  </l-spacing>
</p>

```vue
<l-spacing x="md" betweenX>
  <l-choose v-model="hero" value="鲁班七号">鲁班七号</l-choose>
  <l-choose v-model="hero" value="马可波罗">马可波罗</l-choose>
  <l-choose v-model="hero" value="孙悟空">孙悟空</l-choose>
</l-spacing>

<script>
export default {
  data: () => ({
    hero: '鲁班七号'
  })
}
</script>
```

### 多选

设置 `chosenValue` 为**数组**即表示多选。

<p>
  <l-spacing x="md" betweenX>
    <l-choose v-model="heroList" value="鲁班七号">鲁班七号</l-choose>
    <l-choose v-model="heroList" value="马可波罗">马可波罗</l-choose>
    <l-choose v-model="heroList" value="孙悟空">孙悟空</l-choose>
  </l-spacing>
</p>

```vue
<l-spacing x="md" betweenX>
  <l-choose v-model="heroList" value="鲁班七号">鲁班七号</l-choose>
  <l-choose v-model="heroList" value="马可波罗">马可波罗</l-choose>
  <l-choose v-model="heroList" value="孙悟空">孙悟空</l-choose>
</l-spacing>

<script>
export default {
  data: () => ({
    heroList: ['鲁班七号']
  })
}
</script>
```

### 同意

设置 `chosenValue` 为**布尔值**即表示同意。

<p>
  <l-choose v-model="agree" shape="circle">同意《共产党宣言》</l-choose>
</p>

```vue
<l-choose v-model="agree" shape="circle">鲁班七号</l-choose>

<script>
export default {
  data: () => ({
    agree: true
  })
}
</script>
```

### 主键

在单选或多选中，当 `value` 为对象时，可附加主键，以唯一标识 `value`。

<p>
  <l-spacing x="md" betweenX>
    <l-choose
      v-model="myCity"
      :value="city"
      primaryKey="name"
      v-for="city in cityList"
      :key="city.name">
      {{ city.name }}
    </l-choose>
    {{ myCity }}
  </l-spacing>
</p>

```vue
<l-spacing x="md" betweenX>
  <l-choose
    v-model="myCity"
    :value="city"
    primaryKey="name"
    v-for="city in cityList"
    :key="city.name">
    {{ city.name }}
  </l-choose>
  {{ myCity }}
</l-spacing>

<script>
export default {
  data: () => ({
    cityList: [
      { name: '大连', province: '辽宁' },
      { name: '贵阳', province: '贵州' },
      { name: '西宁', province: '青海' }
    ],
    myCity: { name: '贵阳', province: '贵州' }
  })
}
</script>
```

### 主色调

你可以直接通过 CSS 的 `color` 属性去修改主色调。

<p>
  <l-spacing x="md" betweenX>
    <l-choose chosenValue="鲁班七号" value="鲁班七号" style="color:red;">
      鲁班七号
    </l-choose>
    <l-choose :chosenValue="['马可波罗']" value="马可波罗" style="color:blue;">
      马可波罗
    </l-choose>
  </l-spacing>
</p>

```vue
<l-spacing x="md" betweenX>
  <l-choose chosenValue="鲁班七号" value="鲁班七号" style="color:red;">
    鲁班七号
  </l-choose>
  <l-choose :chosenValue="['马可波罗']" value="马可波罗" style="color:blue;">
    马可波罗
  </l-choose>
</l-spacing>
```

### 块级展示

设置 `block` 为 `true` 即可块级展示选项。

<p>
  <l-spacing y="md" betweenY>
    <l-choose v-model="hero" value="鲁班七号" block>鲁班七号</l-choose>
    <l-choose v-model="hero" value="马可波罗" block>马可波罗</l-choose>
    <l-choose v-model="hero" value="孙悟空" block>孙悟空</l-choose>
  </l-spacing>
</p>

```vue
<l-spacing y="md" betweenY>
  <l-choose v-model="hero" value="鲁班七号" block>鲁班七号</l-choose>
  <l-choose v-model="hero" value="马可波罗" block>马可波罗</l-choose>
  <l-choose v-model="hero" value="孙悟空" block>孙悟空</l-choose>
</l-spacing>

<script>
export default {
  data: () => ({
    hero: '鲁班七号'
  })
}
</script>
```

### 禁用状态

使用 `disabled` 标记其不可选择。

<p>
  <l-spacing x="md" betweenX>
    <l-choose chosenValue="鲁班七号" value="鲁班七号" disabled>
      鲁班七号
    </l-choose>
    <l-choose chosenValue="鲁班七号" value="鲁班七号" shape="square" disabled>
      鲁班七号
    </l-choose>
    <l-choose :chosenValue="['鲁班七号']" value="鲁班七号" disabled>
      鲁班七号
    </l-choose>
    <l-choose :chosenValue="['鲁班七号']" value="鲁班七号" shape="circle" disabled>
      鲁班七号
    </l-choose>
  </l-spacing>
</p>

```vue
<l-spacing x="md" betweenX>
  <l-choose chosenValue="鲁班七号" value="鲁班七号" disabled>
    鲁班七号
  </l-choose>
  <l-choose chosenValue="鲁班七号" value="鲁班七号" shape="square" disabled>
    鲁班七号
  </l-choose>
  <l-choose :chosenValue="['鲁班七号']" value="鲁班七号" disabled>
    鲁班七号
  </l-choose>
  <l-choose :chosenValue="['鲁班七号']" value="鲁班七号" shape="circle" disabled>
    鲁班七号
  </l-choose>
</l-spacing>
```


## API

### Props

属性        | 说明                                                  | 类型                                       | 默认值
------------|-------------------------------------------------------|--------------------------------------------|--------
chosenValue | 选中值，可使用 `v-model` 双向绑定                      | any                                        | -
value       | 当前值                                                | any                                        | -
primaryKey  | 主键，当 `value` 为对象时，可附加主键，以唯一标识 `value` | string \| number \| value => primaryKey              | -
type        | 类型                                                  | `auto` \| `radio` \| `checkbox` \| `agree` | auto
shape       | 形状                                                  | `auto` \| `square` \| `circle`             | auto
block       | 是否块级展示                                          | boolean                                    | false
disabled    | 是否禁用状态                                          | boolean                                    | false

<script>
export default {
  data: () => ({
    hero: '鲁班七号',
    heroList: ['鲁班七号'],
    agree: true,
    cityList: [
      { name: '大连', province: '辽宁' },
      { name: '贵阳', province: '贵州' },
      { name: '西宁', province: '青海' }
    ],
    myCity: { name: '贵阳', province: '贵州' }
  })
}
</script>
