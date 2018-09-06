# 自定义主题

你可以使用命令行工具进行主题定制。

## 安装工具

首先，将工具安装在项目下：

```bash
yarn add @lopo/theme -D

# 或者

npm i @lopo/theme -D
```

## 导出默认主题

接着，在 `package.json` 里加上主题相关的脚本：

```json
{
  "scripts": {
    "theme:eject": "lt eject -o src/styles/lopo",
    "theme:build": "lt build src/styles/lopo -o src/styles/lopo.css"
  }
}
```

接下来，导出默认主题，如此你可以对其进行深度改造：

```bash
yarn lt
```
