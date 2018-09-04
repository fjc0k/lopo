# 评分 Rate

评分组件。

## 代码演示

### 基础用法

使用 `value` 设置初始分值。

若需同步分值，使用 `v-model` 双向绑定即可。

<p>
  <l-rate :value="2"></l-rate>
</p>

```vue
<l-rate :value="2"></l-rate>
```

### 自定义星星数

使用 `count` 设置星星数。

<p>
  <l-rate :value="2" :count="10"></l-rate>
</p>

```vue
<l-rate :value="2" :count="10"></l-rate>
```

### 自定义图标

使用 `icon` 自定义图标。

<p>
  <l-rate :value="2" icon="l-sound"></l-rate>
</p>

```vue
<l-rate :value="2" icon="l-sound"></l-rate>
```

### 只读状态

使用 `readonly` 设置只读状态。

<p>
  <l-rate :value="2" readonly></l-rate>
</p>

```vue
<l-rate :value="2" readonly></l-rate>
```


## API

### Props

属性     | 说明                           | 类型    | 默认值
---------|--------------------------------|---------|-------------
value    | 分值，可使用 `v-model` 双向绑定 | number  | 0
icon     | 指示图标                       | string  | l-star-fill
count    | 指示图标数量                   | number  | 5
readonly | 是否只读状态                   | boolean | false
