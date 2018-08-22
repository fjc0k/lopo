const path = require('path')
const fs = require('fs-extra')

const lopoPath = path.parse(require.resolve('lopo/src/components/_styles/settings.styl')).dir

fs.copySync(lopoPath, path.join(__dirname, '../styles/lopo'))

console.log(lopoPath)
