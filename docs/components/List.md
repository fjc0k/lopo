# 列表 List

单个连续模块垂直排列，显示当前的内容、状态和可进行的操作。


## 代码演示

### 普通列表

<p>
  <l-list>
    <l-list-item title="姓名" extra="Jay" />
    <l-list-item title="年龄" extra="23" />
    <l-list-item title="国籍" extra="China" />
  </l-list>
</p>

```vue
<l-list>
  <l-list-item title="姓名" extra="Jay" />
  <l-list-item title="年龄" extra="23" />
  <l-list-item title="国籍" extra="China" />
</l-list>
```

### 长分割线列表

<p>
  <l-list longDivider>
    <l-list-item title="姓名" extra="Jay" />
    <l-list-item title="年龄" extra="23" />
    <l-list-item title="国籍" extra="China" />
  </l-list>
</p>

```vue
<l-list longDivider>
  <l-list-item title="姓名" extra="Jay" />
  <l-list-item title="年龄" extra="23" />
  <l-list-item title="国籍" extra="China" />
</l-list>
```

### 无分割线列表

<p>
  <l-list noDivider>
    <l-list-item title="姓名" extra="Jay" />
    <l-list-item title="年龄" extra="23" />
    <l-list-item title="国籍" extra="China" />
  </l-list>
</p>

```vue
<l-list noDivider>
  <l-list-item title="姓名" extra="Jay" />
  <l-list-item title="年龄" extra="23" />
  <l-list-item title="国籍" extra="China" />
</l-list>
```

### 无边框列表

<p>
  <l-list noBorder>
    <l-list-item title="姓名" extra="Jay" />
    <l-list-item title="年龄" extra="23" />
    <l-list-item title="国籍" extra="China" />
  </l-list>
</p>

```vue
<l-list noBorder>
  <l-list-item title="姓名" extra="Jay" />
  <l-list-item title="年龄" extra="23" />
  <l-list-item title="国籍" extra="China" />
</l-list>
```


## API

### Props

属性        | 说明             | 类型    | 默认值
------------|------------------|---------|--------
tag         | HTML 标签        | string  | div
longDivider | 是否显示长分割线 | boolean | false
noDivider   | 是否无分割线     | boolean | false
noBorder    | 是否无边框       | boolean | false




