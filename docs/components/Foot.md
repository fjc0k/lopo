# 脚注 Foot

区域底部提示等。


## 代码演示

### 提示

<p>
  <l-list>
    <l-list-item title="姓名" extra="Jay" />
    <l-list-item title="年龄" extra="23" />
  </l-list>
  <l-foot>*注意保护个人隐私</l-foot>
</p>

```vue
<l-list>
  <l-list-item title="姓名" extra="Jay" />
  <l-list-item title="年龄" extra="23" />
</l-list>
<l-foot>*注意保护个人隐私</l-foot>
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
