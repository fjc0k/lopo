---
sidebar: false
---

# Lopo

Lopo 是一款基于 Vue 的移动端 UI 组件库，设计上主要参考了 [Ant Design Mobile of React](https://github.com/ant-design/ant-design-mobile/)。

## 特性

- 比较完善的组件库
- 统一友好的 API 设计
- 支持自定义主题

## 安装

```bash
yarn add lopo

# 或者

npm i lopo
```

## 使用

```js
import 'lopo/dist/lopo.css'
import Vue from 'vue'
import { Button } from 'lopo'

new Vue({
  el: '#app',
  render: h => h(Button, 'Start')
})
```

## 浏览器支持

- iOS 7+
- Android 4+
