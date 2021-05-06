const {execSql} = require("../db/mysql");
const addBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const modifyBlog = (id, blogData) => {
  return {
    id,
  }
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
  console.log(sql)
  return execSql(sql)
}

const getDetail = (id = 0) => {
  return {
    id,
    name: 'zzw'
  }
}

const deleteBlog = id => {
  return {
    id
  }
}
module.exports = {
  getList,
  getDetail,
  addBlog,
  modifyBlog,
  deleteBlog
}
