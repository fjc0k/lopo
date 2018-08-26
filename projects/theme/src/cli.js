const program = require('commander')
const path = require('path')
const fs = require('fs-extra')

const resolvePath = path.resolve.bind(path, process.cwd())

const themePath = resolvePath('node_modules/lopo/src/components/_styles')

program
  .command('eject', '提取源样式')
  .option('-o, --output [dir]', '源样式存放目录', 'src/styles/lopo')
  .action(({ output }) => {
    console.log(3333333333)
    const ejectToPath = resolvePath(output)
    fs.copySync(themePath, ejectToPath)
  })

program
  .command('build <entry>', '编译源样式')
  .option('-o, --output [file]', '编译后样式存放文件', 'src/styles/lopo.css')
  .action((x, { output }) => {
    console.log(33333333333333333333333333333333333333333)
    console.log(x, output)
    // fs.copySync(themePath, ejectToPath)
  })

program.parse(process.argv)
