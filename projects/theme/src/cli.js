#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const fs = require('fs-extra')
const consola = require('consola')
const globby = require('globby')
const stylus = require('stylus')
const postcss = require('postcss')
const postcssModules = require('postcss-modules')
const autoprefixer = require('autoprefixer')
const { kebabCase } = require('lodash')

const resolvePath = path.resolve.bind(path, process.cwd())

const themePath = resolvePath('node_modules/lopo/src/components/_styles')

program
  .command('eject')
  .option('-o, --output [dir]', '源样式存放目录', 'src/styles/lopo')
  .action(({ output }) => {
    try {
      const ejectToPath = resolvePath(output)
      fs.copySync(themePath, ejectToPath)
      consola.success('样式导出成功!')
    } catch (err) {
      consola.error(err)
    }
  })

program
  .command('build [entry]')
  .option('-o, --output [file]', '编译后样式存放文件', 'src/styles/lopo.css')
  .action((entry = 'src/styles/lopo', { output }) => {
    consola.start('开始编译样式...')
    const stylDir = resolvePath(entry, 'components')
    const stylFiles = globby.sync(resolvePath(stylDir, '*.styl'))
    const runners = Promise.all(
      stylFiles.map(stylFile => {
        return new Promise((resolve, reject) => {
          const stylFileContent = fs.readFileSync(stylFile, 'utf8')
          stylus(stylFileContent)
            .set('paths', [stylDir])
            .render((err, css) => {
              if (err) return reject(err)
              postcss([
                postcssModules({
                  getJSON: () => {},
                  generateScopedName(localName, name) {
                    name = path.parse(name).name
                    name = name.replace(/\.module$/, '')
                    name = kebabCase(name)
                    localName = kebabCase(localName)
                    return [
                      'l',
                      name,
                      name === localName ? '' : localName
                    ].filter(v => !!v).join('-')
                  }
                }),
                autoprefixer({
                  browsers: [
                    'iOS >= 7',
                    'Android >= 4'
                  ]
                })
              ])
                .process(css, { from: stylFile })
                .then(resolve, reject)
            })
        })
      })
    )
    runners
      .then(styles => {
        const css = styles.map(style => style.css).join('\n')
        fs.outputFileSync(resolvePath(output), css)
        consola.success('样式编译成功!')
      })
      .catch(err => {
        consola.error(err)
      })
  })

program.parse(process.argv)

if (!program.args.length) program.help()
