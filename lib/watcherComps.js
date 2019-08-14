const fs = require('fs')
const path = require('path')
const run = require('./run')
const getCompsPath = require('./getDirs')

module.exports = function watcherComps () {
  let ret = getCompsPath()
  ret = (ret || []).filter(e => e && e.path.indexOf('node_modules') === -1)
  const [compPath] = ret
  if (!compPath) {
    console.log(`当前未找到文件夹components`)
    return
  }
  fs.watch(path.resolve(compPath.path + 'components'), (event, filename) => {
    // 监听文件夹变化，修改index.js,去除index.js，否则导致死循环
    if (filename.indexOf('index.') === -1) {
      run()
    }
  })
}
