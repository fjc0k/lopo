# 头注 Head

区域顶部标题等。


## 代码演示

### 标题

<p>
  <l-head>个人信息</l-head>
  <l-list>
    <l-list-item title="姓名" extra="Jay" />
    <l-list-item title="年龄" extra="23" />
  </l-list>
</p>

```vue
<l-head>个人信息</l-head>
<l-list>
  <l-list-item title="姓名" extra="Jay" />
  <l-list-item title="年龄" extra="23" />
</l-list>
```


## API

### Props

属性  | 说明                 | 类型 | 默认值
------|----------------------|------|--------
extra | 附加信息（显示在右侧） | any  | -

### Slots

插槽  | 说明                 | 作用域参数
------|----------------------|------------
extra | 附加信息（显示在右侧） | -
