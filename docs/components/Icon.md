# 图标 Icon

SVG 图标。


## 代码演示

使用 `name` 引用特定名字的图标。通常名字以 `l-` 开头的图标为内置图标。

<l-icon name="l-sound" />

```vue
<l-icon name="l-sound" />
```


## 内置图标列表

点击可复制图标代码。

<p>
  <l-grid :cols="5">
    <l-grid-item class="icon" v-for="(symbol, name) in icons" :key="name" :icon="name" @click.native="handleIconClick(name)">{{ name }}</l-grid-item>
  </l-grid>
</p>


## API

### Props

属性 | 说明     | 类型   | 默认值
-----|----------|--------|--------
name | 图标名称 | string | -

<script>
import kebabCase from 'lodash/kebabCase'

export default {
  computed: {
    icons() {
      const localIcons = this.$lopo.Icon.localIcons
      return Object.keys(localIcons).reduce((icons, name) => {
        icons[kebabCase(`l-${name}`)] = localIcons[name]
        return icons
      }, {})
    }
  },
  methods: {
    handleIconClick(name) {
      this.$copyText(`<l-icon name="${name}" />`)
        .then(() => {
          this.$toast.top('复制成功')
        })
        .catch(() => {
          this.$toast.top('复制失败')
        })
    }
  }
}
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
