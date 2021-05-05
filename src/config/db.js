const env = process.env.NODE_ENV;

let MYSQL_CONFIG

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'myBlog'
  }
} else {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'myBlog'
  }
}

module.exports = {
  MYSQL_CONFIG
}
