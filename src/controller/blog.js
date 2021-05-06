const {execSql} = require("../db/mysql");
const addBlog = (blogData = {}) => {
  const {title, content, author = 'zzw1994529'} = blogData
  const createTime = Date.now()
  const sql = `insert into blogs(title, content, author, createTime) values ('${title}','${content}','${author}','${createTime}')`
  return execSql(sql).then(res => {
    return {
      id: res.insertId
    }
  })
}

const modifyBlog = (id, blogData) => {
  const {title, content} = blogData
  const modifyTime = Date.now()
  const sql = `update blogs set title='${title}', content='${content}', modifyTime='${modifyTime}' where id = ${id} `
  return execSql(sql)
}

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1 = 1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createTime desc`
  return execSql(sql)
}

const getDetail = (id = 0) => {
  let sql = `select * from blogs where id=${id}`
  return execSql(sql).then(rows => rows[0])
}

const deleteBlog = id => {
  const sql = `delete from blogs where id = ${id}`
  return execSql(sql)
}
module.exports = {
  getList,
  getDetail,
  addBlog,
  modifyBlog,
  deleteBlog
}
