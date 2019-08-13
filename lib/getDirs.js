const fs = require('fs')
const path = require('path')

module.exports = function getCompsPath (path = './' , filesList) {
  const ret = []
  readDirList(path, ret)

  // 读取文件夹
  function readDirList (path, filesList) {
    var files = fs.readdirSync(path)
    files.forEach(function (itm, index) {
      var stat = fs.statSync(path + itm)
      if (itm === 'components') {
        ret.push({
          path: path,
          filename: itm
        })
      }
      else if (stat.isDirectory()) {
        // 递归读取文件
        readDirList(path + itm + '/', filesList)
      }
    })
  }

  return ret
}
