# 价格 Price

用于展示商品定价。


## 代码演示

### 基础用法

使用 `value` 设置价格值。

<p>
  <l-price :value="20.21"></l-price>
</p>

```vue
<l-price :value="20.21"></l-price>
```

### 保留一位小数

使用 `decimal` 设置小数位数。

<p>
  <l-price :value="20.21" :decimal="1"></l-price>
</p>

```vue
<l-price :value="20.21" :decimal="1"></l-price>
```

### 小数值缩小

使用 `decimalSize` 设置小数值大小，`normal` 为默认大小，可选 `small`。

<p>
  <l-price :value="20.21" decimalSize="small"></l-price>
</p>

```vue
<l-price :value="20.21" decimalSize="small"></l-price>
```

### 自定义货币符号

使用 `symbol` 自定义货币符号。

<p>
  <l-price :value="20.21" symbol="$"></l-price>
</p>

```vue
<l-price :value="20.21" symbol="$"></l-price>
```

### 自定义货币符号位置

使用 `symbolPosition` 自定义货币符号位置，`middle` 为默认位置，可选 `top`、`bottom`。

<p>
  <l-spacing x="lg" betweenX>
    <l-price :value="20.21" symbolPosition="top"></l-price>
    <l-price :value="20.21"></l-price>
    <l-price :value="20.21" symbolPosition="bottom"></l-price>
  </l-spacing>
</p>

```vue
<l-spacing x="lg" betweenX>
  <l-price :value="20.21" symbolPosition="top"></l-price>
  <l-price :value="20.21"></l-price>
  <l-price :value="20.21" symbolPosition="bottom"></l-price>
</l-spacing>
```

### 价格区间

使用 `max` 设置最大价格，使用 `hyphen` 设置连接符。

<p>
  <l-spacing x="lg" betweenX>
    <l-price :value="20.21" :max="90.91"></l-price>
    <l-price :value="20.21" :max="90.91" hyphen="~"></l-price>
  </l-spacing>
</p>

```vue
<l-spacing x="lg" betweenX>
  <l-price :value="20.21" :max="90.91"></l-price>
  <l-price :value="20.21" :max="90.91" hyphen="~"></l-price>
</l-spacing>
```

### 删除状态

使用 `deleted` 标识价格不再有效。

<p>
  <l-price :value="20.21" deleted></l-price>
</p>

```vue
<l-price :value="20.21" deleted></l-price>
```


## API

### Props

属性 | 说明     | 类型   | 默认值
-----|----------|--------|--------
value | 价格值 | number | -
max | 最大价格值 | number | -
hyphen | 连接符 | string | `-`
symbol | 货币符号 | string | ¥
symbolPosition | 货币符号位置 | `middle` \| `top` \| `bottom` | middle
decimal | 保留小数位数 | number | 2
decimalSize | 小数值大小 | `normal` \| `small` | normal
deleted | 是否删除状态 | boolean | false
