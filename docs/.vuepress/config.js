module.exports = {
  title: 'Lopo',
  description: '这是一个基于 Vue 的移动端 UI 组件库，希望给你柳暗花明又一村的感觉！',
  base: '/lopo/',
  chainWebpack(config) {
    config.module
      .rule('js')
      .exclude.add(/lopo\./)
  },
  themeConfig: {
    repo: 'fjc0k/lopo',
    repoLabel: '贡献代码',
    docsRepo: 'fjc0k/lopo',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: 'true',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    sidebarDepth: 2,
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      {
        text: '生态系统',
        items: [
          {
            text: '官方资源',
            items: [
              { text: 'vue-cli-plugin-lopo', link: 'https://baidu.com' }
            ]
          },
          {
            text: '社区资源',
            items: [
              { text: 'vue-cli-plugin-lopo', link: 'https://baidu.com' }
            ]
          }
        ]
      }
    ],
    sidebar: [
      '/components/QuickStart',
      '/components/CustomizeTheme',
      {
        title: '布局组件',
        collapsable: false,
        children: [
          '/components/Spacing'
        ]
      },
      {
        title: '数据展示组件',
        collapsable: false,
        children: [
          '/components/Icon',
          '/components/Carousel',
          '/components/List',
          '/components/Preview',
          '/components/Price',
          '/components/Head',
          '/components/Foot'
        ]
      },
      {
        title: '表单组件',
        collapsable: false,
        children: [
          '/components/Button',
          '/components/Rate',
          '/components/Switch',
          '/components/Counter',
          '/components/Choose',
          '/components/Input',
          '/components/Form'
        ]
      }
    ]
  }
}
