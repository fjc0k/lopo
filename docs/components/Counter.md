# 计数器 Counter

对数值的存储、变更以及展示。


## 代码演示

### 基本用法

一个可步进、可输入的计数器。

<p>
  <l-counter :value="100" />
</p>

```vue
<l-counter :value="100" />
```

### 限定数值范围

使用 `min`、`max` 限定数值范围：`min <= 计数值 <= max`。

<p>
  <l-counter :value="100" :min="80" :max="105" />
</p>

```vue
<l-counter :value="100" :min="80" :max="105" />
```

### 步进值

默认的步进值为 `1`，可以使用 `step` 改变。

<p>
  <l-counter :value="100" :step="50" />
</p>

```vue
<l-counter :value="100" :step="50" />
```

### 禁止输入

一个只能通过点击步进按钮改变值的计数器。

<p>
  <l-counter :value="100" noInput />
</p>

```vue
<l-counter :value="100" noInput />
```

### 禁用状态

使用 `disabled` 标记其不可用。

<p>
  <l-counter :value="100" disabled />
</p>

```vue
<l-counter :value="100" disabled />
```


## API

### Props

属性     | 说明                             | 类型    | 默认值
---------|----------------------------------|---------|-----------
value    | 计数值，可使用 `v-model` 双向绑定 | number  | 0
min      | 最小值                           | number  | -Infinity
max      | 最大值                           | number  | Infinity
step     | 步进值                           | number  | 1
noInput  | 是否禁止输入                     | boolean | false
disabled | 是否禁用状态                     | boolean | false

