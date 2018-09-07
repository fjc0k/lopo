# 自定义主题

你可以使用命令行工具进行主题定制。

## 操作步骤

首先，将主题工具安装在项目下：

```bash
yarn add @lopo/theme -D

# 或者

npm i @lopo/theme -D
```

接着，在 `package.json` 里加上主题相关的脚本：

```json
{
  "scripts": {
    "theme:eject": "lt eject src/styles/lopo",
    "theme:build": "lt build src/styles/lopo src/styles/lopo.css"
  }
}
```

::: tip 命令行说明
`lt eject [将默认样式导出在该目录下]`

`lt build [样式所在目录] [编译后样式存放文件]`
:::

接下来，导出默认主题：

```bash
yarn theme:eject

# 或者

npm run theme:eject
```

然后，打开 `src/styles/lopo` 目录，开始主题改造：

```bash
src
└─ styles
 	└─ lopo
 	 	├─ components     # 组件样式目录
 	 	├─ mixins.styl    # 混入样式文件
 	 	├─ settings.styl  # 混入样式 + 变量文件
 	 	└─ variables.styl # 变量文件
```

主题改造好了，要生成可用的样式文件：

```bash
yarn theme:build

# 或者

npm run theme:build
```

最后，在项目的入口文件，比如 `src/main.js` 引入编译好的样式文件即可：

```js
import './styles/lopo.css'
```
