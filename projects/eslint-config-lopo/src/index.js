module.exports = {
  extends: [
    'xo',
    'plugin:vue/essential'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  env: {
    browser: true,
    node: true,
    jest: true,
    mocha: true
  },

  rules: {
    // 使用两个空格缩进
    indent: [2, 2, { SwitchCase: 1 }],

    // 字符串使用单引号，允许使用反勾号
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],

    // 行末无分号
    semi: [2, 'never'],

    // 花括号之间有空格
    'object-curly-spacing': [2, 'always'],

    // 允许: if (false) return
    curly: [2, 'multi-line'],

    // 允许: fn && fn()
    'no-unused-expressions': [2, { allowShortCircuit: true }],

    // 允许注释以小写字母打头
    'capitalized-comments': 0,

    // 允许使用较短的符号实现类型转换
    'no-implicit-coercion': 0,

    // 允许返回赋值，但必须用括号包裹
    'no-return-assign': [2, 'except-parens'],

    // 允许 any == null 或 any != null
    'no-eq-null': 0,
    eqeqeq: [2, 'allow-null'],

    // 不允许使用 var
    'no-var': 2,

    // 优先使用 const
    'prefer-const': 2,

    // 优先使用模板字符串
    'prefer-template': 2,

    // 操作符放前面
    'operator-linebreak': [2, 'before']
  }
}
