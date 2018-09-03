# 按钮 Button

用于触发某种事件或操作。


## 代码演示

### 各色按钮

使用 `type` 指定按钮主色调。

<p>
  <l-spacing y="md">
    <l-button>默认按钮</l-button>
    <l-button type="primary">主要按钮</l-button>
    <l-button type="warning">警告按钮</l-button>
    <l-button type="danger">危险按钮</l-button>
  </l-spacing>
</p>

```vue
<l-spacing y="md">
  <l-button>默认按钮</l-button>
  <l-button type="primary">主要按钮</l-button>
  <l-button type="warning">警告按钮</l-button>
  <l-button type="danger">危险按钮</l-button>
</l-spacing>
```

### 各形按钮

使用 `shape` 指定按钮形状。

<p>
  <l-spacing y="md">
    <l-button type="primary" shape="flat">扁平按钮（默认）</l-button>
    <l-button type="primary" shape="round">圆角按钮</l-button>
    <l-button type="primary" shape="square">直角按钮</l-button>
    <l-button type="primary" shape="circle">
      <l-icon name="l-sound" />
    </l-button>
  </l-spacing>
</p>

```vue
<l-spacing y="md">
  <l-button type="primary" shape="flat">扁平按钮（默认）</l-button>
  <l-button type="primary" shape="round">圆角按钮</l-button>
  <l-button type="primary" shape="square">直角按钮</l-button>
  <l-button type="primary" shape="circle">
    <l-icon name="l-sound" />
  </l-button>
</l-spacing>
```

### 朴素按钮

设置 `plain` 为 `true` 即可得到按钮的朴素样式。

<p>
  <l-spacing y="md">
    <l-button plain>默认按钮</l-button>
    <l-button type="primary" plain>主要按钮</l-button>
    <l-button type="warning" plain>警告按钮</l-button>
    <l-button type="danger" plain>危险按钮</l-button>
  </l-spacing>
</p>

```vue
<l-spacing y="md">
  <l-button plain>默认按钮</l-button>
  <l-button type="primary" plain>主要按钮</l-button>
  <l-button type="warning" plain>警告按钮</l-button>
  <l-button type="danger" plain>危险按钮</l-button>
</l-spacing>
```

### 迷你按钮

设置 `mini` 为 `true` 即可得到小型的内联按钮。

<p>
  <l-spacing x="md" betweenX>
    <l-button mini>默认按钮</l-button>
    <l-button type="primary" mini>主要按钮</l-button>
    <l-button type="warning" mini>警告按钮</l-button>
    <l-button type="danger" mini>危险按钮</l-button>
  </l-spacing>
</p>

<p>
  <l-spacing x="md" betweenX>
    <l-button plain mini>默认按钮</l-button>
    <l-button type="primary" plain mini>主要按钮</l-button>
    <l-button type="warning" plain mini>警告按钮</l-button>
    <l-button type="danger" plain mini>危险按钮</l-button>
  </l-spacing>
</p>

```vue
<l-spacing x="md" betweenX>
  <l-button mini>默认按钮</l-button>
  <l-button type="primary" mini>主要按钮</l-button>
  <l-button type="warning" mini>警告按钮</l-button>
  <l-button type="danger" mini>危险按钮</l-button>
</l-spacing>

<l-spacing x="md" betweenX>
  <l-button plain mini>默认按钮</l-button>
  <l-button type="primary" plain mini>主要按钮</l-button>
  <l-button type="warning" plain mini>警告按钮</l-button>
  <l-button type="danger" plain mini>危险按钮</l-button>
</l-spacing>
```

### 无边框按钮

设置 `noBorder` 为 `true` 即可得到无边框按钮。

<p>
  <l-button type="primary" noBorder>主要按钮</l-button>
</p>

<p>
  <l-spacing x="md" betweenX>
    <l-button mini noBorder>默认按钮</l-button>
    <l-button type="primary" mini noBorder>主要按钮</l-button>
    <l-button type="warning" mini noBorder>警告按钮</l-button>
    <l-button type="danger" mini noBorder>危险按钮</l-button>
  </l-spacing>
</p>

```vue
<l-button type="primary" noBorder>主要按钮</l-button>

<l-spacing x="md" betweenX>
  <l-button mini noBorder>默认按钮</l-button>
  <l-button type="primary" mini noBorder>主要按钮</l-button>
  <l-button type="warning" mini noBorder>警告按钮</l-button>
  <l-button type="danger" mini noBorder>危险按钮</l-button>
</l-spacing>
```


## API

### Props

属性       | 说明           | 类型                                            | 默认值
-----------|----------------|-------------------------------------------------|---------
nativeType | 原生按钮类型   | `button` \| `submit` \| `reset`                 | button
type       | 按钮类型       | `default` \| `primary` \| `warning` \| `danger` | default
shape      | 按钮形状       | `flat` \| `square` \| `round` \| `circle`       | flat
plain      | 是否朴素按钮   | boolean                                         | false
mini       | 是否迷你按钮   | boolean                                         | false
noBorder   | 是否无边框按钮 | boolean                                         | false

### Events

事件  | 说明     | 参数
------|----------|----------
click | 点击事件 | (e: Event)
