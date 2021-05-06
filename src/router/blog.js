const {getPropertyFromRequest} = require('../utils')
const {SuccessModel, ErrorModel} = require('../model/restModal')
const {getList, getDetail, addBlog, modifyBlog, deleteBlog} = require('../controller/blog')
const handleBlogRouter = (req, res) => {
  const {method, path} = getPropertyFromRequest(req)
  const {id = 0} = req.query
  if (method === 'GET' && path === '/api/blog/list') {
    const {author, keyword} = req.query
    const data = getList(author, keyword)
    return new SuccessModel(data)
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  if (method === 'POST' && path === '/api/blog/add') {
    const data = addBlog(req.body)
    return new SuccessModel(data)
  }

  if (method === 'POST' && path === '/api/blog/update') {
    const data = modifyBlog(id, req.body)
    if (data) {
      return new SuccessModel(data)
    } else {
      return new ErrorModel('modify failed')
    }
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    const data = deleteBlog(id)
    if (data) {
      return new SuccessModel(data)
    } else {
      return new ErrorModel('delete failed')
    }
  }
}

module.exports = handleBlogRouter
