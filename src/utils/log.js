const fs = require('fs')
const path = require('path')

const createWriteStream = (fileName) => {
  const fullFileName = path.resolve(__dirname, '../', '../', 'logs', fileName)
  return fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
}
const writeStream = (writeStream, log) => {
  writeStream.write(log + '\n')
}
const accessWriteSteam = createWriteStream('access.log')

const access = log => {
  writeStream(accessWriteSteam, log)
}
module.exports = {
  access
}
