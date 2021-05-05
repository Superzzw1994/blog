const {getPropertyFromRequest} = require('../utils')
const {SuccessModel, ErrorModel} = require('../model/restModal')
const {getList, getDetail} = require('../controller/blog')
const handleBlogRouter = (req, res) => {
    const {method, path} = getPropertyFromRequest(req)
    if (method === 'GET' && path === '/api/blog/list') {
        const {author, keyword} = req.query
        const data = getList(author, keyword)
        return new SuccessModel(data)
    }

    if (method === 'GET' && path === '/api/blog/detail') {
        const {id = 0} = req.query
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    if (method === 'POST' && path === '/api/blog/add') {
        return {
            msg: '这是新建博客的接口'
        }
    }

    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: '这是更新博客的接口'
        }
    }

    if (method === 'POST' && path === '/api/blog/delete') {
        return {
            msg: '这是删除博客的接口'
        }
    }
}

module.exports = handleBlogRouter
