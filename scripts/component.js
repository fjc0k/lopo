#!/usr/bin/env node
const program = require('commander')
const _ = require('lodash')
const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')

const resolvePath = path.resolve.bind(path, __dirname, '..')

const exportComponents = () => {
  let components = globby.sync(resolvePath('src/components/*/*.vue'))
  components = components.map(componentPath => {
    const { name: componentName } = path.parse(componentPath)
    return {
      componentName,
      relativePath: `./${
        path.relative(
          resolvePath('src/components'),
          componentPath
        ).replace(/\\+/g, '/')
      }`
    }
  })
  const componentsArr = components.reduce((result, { componentName, relativePath }) => {
    result.push(`export { default as ${componentName} } from '${relativePath}'`)
    return result
  }, [])
  const componentsStr = `${componentsArr.join('\n')}\n`
  fs.outputFileSync(resolvePath('src/components/index.js'), componentsStr)
}

program
  .command('add <componentName>')
  .option('-c, --category [value]', '分类')
  .action((componentName, { category = componentName }) => {
    fs.outputFileSync(
      resolvePath(`src/components/${category}/${componentName}.vue`),
      // eslint-disable-next-line
`<template>
  <div :class="_.${_.camelCase(componentName)}">

  </div>
</template>

<script>
import { createComponent } from '../_utils'

export default createComponent({
  name: '${componentName}'
})
</script>

<style lang="stylus" src="../_styles/components/${componentName}.module.styl" module />
`
    )
    fs.outputFileSync(
      resolvePath(`src/components/_styles/components/${componentName}.module.styl`),
      // eslint-disable-next-line
`@require '../settings';

.${_.kebabCase(componentName)} {

}
`
    )
    exportComponents()
  })

program
  .command('remove <componentName>')
  .action(componentName => {
    const componentPath = globby.sync(resolvePath(`src/components/*/${componentName}.vue`))[0]
    if (componentPath) {
      fs.removeSync(componentPath)
      const { dir: componentDir } = path.parse(componentPath)
      if (!globby.sync(`${componentDir}/*.vue`).length) {
        fs.removeSync(componentDir)
      }
    }
    const stylePath = globby.sync(resolvePath(`src/components/_styles/components/${componentName}.module.styl`))[0]
    if (stylePath) {
      fs.removeSync(stylePath)
    }
    exportComponents()
  })

program
  .command('export')
  .action(exportComponents)

program.parse(process.argv)
