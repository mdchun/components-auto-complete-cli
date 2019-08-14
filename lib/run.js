const fs = require('fs')
const ora = require('ora')
const path = require('path')
const process = ora(`正在处理...`)
const {promisify} = require('util')
const handlebars = require('handlebars')
const getCompsPath = require('./getDirs')
// 拿到components文件夹， 遍历 文件夹，拿到文件夹名字
const dirs = promisify(fs.readdir)

module.exports = async function run (url = './') {
  process.start()
  let ret = getCompsPath(url)
  ret = (ret || []).filter(e => e && e.path.indexOf('node_modules') === -1)
  const [compPath] = ret
  if (!compPath) {
    process.fail(`未找到文件夹components`)
    return
  }
  dirs(path.resolve(compPath.path + 'components')).then(data => {
    // console.log(data)
    // 过滤已存在的index
    data = data.filter(e => e.indexOf('index') === -1)
    const content = fs.readFileSync(__dirname + '/temp.js').toString()
    const result = handlebars.compile(content)({comps: data})
    const compIndexPath = path.resolve(compPath.path + 'components/index.js')
    // 写入
    fs.writeFileSync(compIndexPath, result)
    process.succeed('处理完成')
  }).catch(e => {
    process.fail(`处理失败`)
  })
}
