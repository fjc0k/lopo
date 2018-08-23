#!/usr/bin/env node
const program = require('commander')

program
  .command('add <componentName>')
  .option('-o, --override', '是否覆盖')
  .option('-p, --parentComponent [value]', '父组件，即分类')
  .action(handlers.add)

program
  .command('remove <componentName>')
  .action(handlers.remove)

program
  .command('export')
  .action(handlers.export)

program.parse(process.argv)
