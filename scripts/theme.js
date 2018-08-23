const path = require('path')
const fs = require('fs-extra')

const resolvePath = path.resolve.bind(path, process.cwd())
const resolveLocalPath = path.resolve.bind(path, __dirname, '..')

const themePath = resolveLocalPath('src/components/_styles')
const ejectToPath = resolvePath('src/styles/lopo')

function eject() {
  fs.copySync(themePath, ejectToPath)
}

eject()
