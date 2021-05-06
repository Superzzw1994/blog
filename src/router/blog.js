const {getPropertyFromRequest} = require('../utils')
const {SuccessModel, ErrorModel} = require('../model/restModal')
const {getList, getDetail, addBlog, modifyBlog, deleteBlog} = require('../controller/blog')
const handleBlogRouter = (req, res) => {
  const {method, path} = getPropertyFromRequest(req)
  const {id = 0} = req.query
  if (method === 'GET' && path === '/api/blog/list') {
    const {author, keyword} = req.query
    return getList(author, keyword).then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && path === '/api/blog/add') {
    return addBlog(req.body).then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && path === '/api/blog/update') {
    return modifyBlog(id, req.body).then(data => {
      if (data) {
        const {affectedRows} = data
        if (affectedRows > 0) {
          return new SuccessModel({
            status: true
          })
        } else {
          return new ErrorModel('更新失败')
        }
      } else {
        return new ErrorModel('更新失败')
      }
    })
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    return deleteBlog(id).then(data => {
      if (data) {
        const {affectedRows} = data
        if (affectedRows > 0) {
          return new SuccessModel({
            status: true
          })
        } else {
          return new ErrorModel('更新失败')
        }
      } else {
        return new ErrorModel('更新失败')
      }
    })
  }
}

module.exports = handleBlogRouter
