# 开关 Switch

在两个对立状态间切换。

## 代码演示

### 初始状态

使用 `value` 设置初始状态。

<p>
  <l-switch :value="true" />
</p>

```vue
<l-switch :value="true" />
```

### 状态同步

若需同步状态，使用 `v-model` 双向绑定即可。

<p>
  <l-switch v-model="closed" />：{{ closed }}
</p>

```vue
<l-switch v-model="closed" />：{{ closed }}

<script>
export default {
  data: () => ({
    closed: true
  })
}
</script>
```

### 状态值映射

默认地，`开` 状态值是 `true`，`关` 状态值是 `false`。通过设置 `onValue` 和 `offValue` 可变更默认状态值。

<p>
  <l-switch v-model="opened" :onValue="1" :offValue="0" />：{{ opened }}
</p>

```vue
<l-switch v-model="opened" :onValue="1" :offValue="0" />：{{ opened }}

<script>
export default {
  data: () => ({
    opened: 1
  })
}
</script>
```

### 异步切换

设置 `autoChange` 为 `false`，则点击开关不会自动切换。此时，可监听 `change` 事件并调用其 `done` 参数即可手动切换。

<p>
  <l-switch v-model="isTop" :autoChange="false" @change="handleSwitchChange"  />：{{ isTop }}
</p>

```vue
<l-switch v-model="isTop" :autoChange="false" @change="handleSwitchChange"  />：{{ closed }}

<script>
export default {
  data: () => ({
    isTop: true
  }),

  methods: {
    handleSwitchChange(isTop, done) {
      this.$loading(isTop ? '置顶中...' : '取消置顶中...')
        .then(loading => {
          setTimeout(() => {
            done()
            loading.hide()
          }, 3000)
        })
    }
  }
}
</script>
```

### 禁用状态

给个 `disabled` 即可标记其不可切换。

<p>
  <l-switch :value="true" disabled />
</p>

```vue
<l-switch :value="true" disabled />
```


## API

### Props

属性       | 说明                             | 类型    | 默认值
-----------|----------------------------------|---------|--------
value      | 状态值，可使用 `v-model` 双向绑定 | any     | -
onValue    | `开` 状态的值                    | any     | true
offValue   | `关` 状态的值                    | any     | false
autoChange | 点击是否自动切换                 | boolean | true
disabled   | 是否禁用状态                     | boolean | false


<script>
export default {
  data: () => ({
    closed: true,
    opened: 1,
    isTop: true
  }),

  methods: {
    handleSwitchChange(isTop, done) {
      this.$loading(isTop ? '置顶中...' : '取消置顶中...')
        .then(loading => {
          setTimeout(() => {
            done()
            loading.hide()
          }, 3000)
        })
    }
  }
}
</script>
