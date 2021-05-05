const mysql = require('mysql')
const {MYSQL_CONFIG} = require('../config/db')
const connect = mysql.createConnection(MYSQL_CONFIG)
connect.connect()
const execSql = (sql) => new Promise((resolve, reject) => {
  connect.query(sql, (err, result) => {
    if (err) {
      reject(err)
    }
    resolve(result)
  })
})
const sql = `insert into users(username, \`password\`, realname) values ('abcccc', 'shzx1994529', 'zzw');`

connect.end()
module.exports = {
  execSql
}
