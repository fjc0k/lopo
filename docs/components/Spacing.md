# 留白 Spacing</Badge>

指元素周围的空白空间，适当的留白可有效提升网页的舒适性与可读性。


## 代码演示

### 元素上下留白

平面直角坐标系中的纵轴又称 `y 轴`，由此，我们将 `y` 理解为上下方向。欲对元素上下留白，只需设置 `y` 为特定的留白尺寸即可。

<p>
  <l-spacing y="md">
    <l-button type="primary">提 交</l-button>
    <l-button>取 消</l-button>
  </l-spacing>
</p>

```vue
<l-spacing y="md">
  <l-button type="primary">提 交</l-button>
  <l-button>取 消</l-button>
</l-spacing>
```

### 元素左右留白

同理，欲对元素左右留白，只需设置 `x` 为特定的留白尺寸即可。

<p>
  <l-spacing x="xl">
    <l-button type="primary" mini>提 交</l-button>
    <l-button mini>取 消</l-button>
  </l-spacing>
</p>

```vue
<l-spacing x="xl">
  <l-button type="primary" mini>提 交</l-button>
  <l-button mini>取 消</l-button>
</l-spacing>
```

### 元素间左右留白

重点在 `间`，使用 `betweenX` 可仅使元素间左右留白。

<p>
  <l-spacing x="xl" betweenX>
    <l-button type="primary" mini>提 交</l-button>
    <l-button mini>取 消</l-button>
  </l-spacing>
</p>

```vue
<l-spacing x="xl" betweenX>
  <l-button type="primary" mini>提 交</l-button>
  <l-button mini>取 消</l-button>
</l-spacing>
```


## API

### Props

属性     | 说明             | 类型                                 | 默认值
---------|------------------|--------------------------------------|--------
top      | 上留白           | `xs` \| `sm` \| `md` \| `lg` \| `xl` | -
right    | 右留白           | `xs` \| `sm` \| `md` \| `lg` \| `xl` | -
bottom   | 下留白           | `xs` \| `sm` \| `md` \| `lg` \| `xl` | -
left     | 左留白           | `xs` \| `sm` \| `md` \| `lg` \| `xl` | -
y        | 上下留白         | `xs` \| `sm` \| `md` \| `lg` \| `xl` | -
x        | 左右留白         | `xs` \| `sm` \| `md` \| `lg` \| `xl` | -
all      | 四周留白         | `xs` \| `sm` \| `md` \| `lg` \| `xl` | -
between  | 仅元素间留白     | boolean                              | false
betweenY | 仅元素间上下留白 | boolean                              | false
betweenX | 仅元素间左右留白 | boolean                              | false
