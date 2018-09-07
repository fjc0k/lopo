# 输入框 Input

接收、存储、展示用户输入的信息。

## 代码演示

### 基本用法

一个纯粹的输入框。

<p>
  <l-input placeholder="请输入你的名字" />
</p>

```vue
<l-input placeholder="请输入你的名字" />
```

### 文本域

将 `type` 设置为 `textarea` 即可多行输入。

<p>
  <l-input type="textarea" rows="5" placeholder="请输入你的名字" />
</p>

```vue
<l-input type="textarea" rows="5" placeholder="请输入你的名字" />
```

### 可清空

输入值不为空时显示清空图标。

<p>
  <l-input placeholder="请输入你的名字" clearable />
</p>

```vue
<l-input placeholder="请输入你的名字" clearable />
```

### 禁用状态

不可输入，但没做样式处理。

<p>
  <l-input placeholder="请输入你的名字" disabled />
</p>

```vue
<l-input placeholder="请输入你的名字" disabled />
```


## API

### Props

除了 [原生 &lt;input&gt; 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#%E5%B1%9E%E6%80%A7) 、[原生 &lt;textarea&gt; 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Textarea#%E5%B1%9E%E6%80%A7)（当 `type` 为 `textarea` 时） 外，还支持以下属性：

属性      | 说明                             | 类型                                                                                                                        | 默认值
----------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------|--------
value     | 输入值，可使用 `v-model` 双向绑定 | any                                                                                                                         | -
type      | 输入框类型                       | `textarea` \| [&lt;input&gt; types](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#Form_%3Cinput%3E_types) | text
clearable | 是否可清空                       | boolean                                                                                                                     | false
disabled  | 是否禁用状态                     | boolean                                                                                                                     | false

::: warning 注意
默认地，`Input` 组件禁用了 `autocomplete`（自动填充）、`autocapitalize`（首字母自动大写）、`autocorrect`（自动改正）、`spellcheck`（检查拼写） 这四个属性，如需使用，请自行开启。
:::
