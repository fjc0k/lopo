const path = require('path')
const fs = require('fs-extra')

const resolvePath = path.resolve.bind(path, process.cwd())

const themePath = resolvePath('node_modules/lopo/src/components/_styles')
const ejectToPath = resolvePath('src/styles/lopo')

fs.ensureDirSync(ejectToPath)
fs.emptyDirSync(ejectToPath)
fs.copySync(themePath, ejectToPath)
