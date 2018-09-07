# 预览 Preview

预览数据。


## 代码演示

### 基本用法

使用 `<l-preview-item />` 展示具体数据项，首个 `<l-preview-item />` 的值将会被着重显示，并有分割线区隔附加信息。（当然，[你可以改变这种默认行为](#朴素风格)。）

<p>
  <l-preview>
    <l-preview-item title="订单状态">已发货</l-preview-item>
    <l-preview-item title="商品名称">苹果2080</l-preview-item>
    <l-preview-item title="规格型号">黑色-1T</l-preview-item>
    <l-preview-item title="数量">x5</l-preview-item>
  </l-preview>
</p>

```vue
<l-preview>
  <l-preview-item title="发货状态">已发货</l-preview-item>
  <l-preview-item title="商品名称">苹果2080</l-preview-item>
  <l-preview-item title="规格型号">黑色-1T</l-preview-item>
  <l-preview-item title="数量">x5</l-preview-item>
</l-preview>
```

### 分组数据

使用 `<l-preview-divider />` 分割不同类型的数据。

<p>
  <l-preview>
    <l-preview-item title="订单状态">已发货</l-preview-item>
    <l-preview-item title="商品名称">苹果2080</l-preview-item>
    <l-preview-item title="规格型号">黑色-1T</l-preview-item>
    <l-preview-item title="数量">x5</l-preview-item>
    <l-preview-divider />
    <l-preview-item title="订单时间">2080-05-20 22:19</l-preview-item>
    <l-preview-divider />
    <l-preview-item title="快递公司">峡谷特快</l-preview-item>
    <l-preview-item title="快递单号">3203994949656895</l-preview-item>
  </l-preview>
</p>

```vue
<l-preview>
  <l-preview-item title="订单状态">已发货</l-preview-item>
  <l-preview-item title="商品名称">苹果2080</l-preview-item>
  <l-preview-item title="规格型号">黑色-1T</l-preview-item>
  <l-preview-item title="数量">x5</l-preview-item>
  <l-preview-divider />
  <l-preview-item title="订单时间">2080-05-20 22:19</l-preview-item>
  <l-preview-divider />
  <l-preview-item title="快递公司">峡谷特快</l-preview-item>
  <l-preview-item title="快递单号">3203994949656895</l-preview-item>
</l-preview>
```

### 朴素风格

不对首个 `<l-preview-item />` 做任何特殊处理。

<p>
  <l-preview plain>
    <l-preview-item title="订单状态">已发货</l-preview-item>
    <l-preview-item title="商品名称">苹果2080</l-preview-item>
    <l-preview-item title="规格型号">黑色-1T</l-preview-item>
    <l-preview-item title="数量">x5</l-preview-item>
  </l-preview>
</p>

```vue
<l-preview plain>
  <l-preview-item title="发货状态">已发货</l-preview-item>
  <l-preview-item title="商品名称">苹果2080</l-preview-item>
  <l-preview-item title="规格型号">黑色-1T</l-preview-item>
  <l-preview-item title="数量">x5</l-preview-item>
</l-preview>
```

### 无边框

设置 `<l-preview />` 的 `noBorder` 为 `true` 即可。

<p>
  <l-preview noBorder>
    <l-preview-item title="订单状态">已发货</l-preview-item>
    <l-preview-item title="商品名称">苹果2080</l-preview-item>
    <l-preview-item title="规格型号">黑色-1T</l-preview-item>
    <l-preview-item title="数量">x5</l-preview-item>
  </l-preview>
</p>

```vue
<l-preview noBorder>
  <l-preview-item title="发货状态">已发货</l-preview-item>
  <l-preview-item title="商品名称">苹果2080</l-preview-item>
  <l-preview-item title="规格型号">黑色-1T</l-preview-item>
  <l-preview-item title="数量">x5</l-preview-item>
</l-preview>
```


## API

### Preview

#### Props

属性     | 说明         | 类型    | 默认值
---------|--------------|---------|--------
plain    | 是否朴素风格 | boolean | false
noBorder | 是否无边框   | boolean | false

### PreviewItem

#### Props

属性  | 说明                          | 类型 | 默认值
------|-------------------------------|------|--------
title | 标题                          | any  | -
value | 值，该值会被默认插槽的数据覆盖 | any  | -

#### Slots

插槽  | 说明 | 作用域参数
------|------|------------
title | 标题 | -
