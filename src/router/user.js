const {ErrorModel} = require("../model/restModal");
const {SuccessModel} = require("../model/restModal");
const {getPropertyFromRequest} = require("../utils");
const {login} = require('../controller/user')
const {set} = require('../db/redis')

const handleUserRouter = (req, res) => {
  const {method, path} = getPropertyFromRequest(req)
  if (method === 'POST' && path === '/api/user/login') {
    const {username, password} = req.body
    // const {author, keyword} = req.query
    return login(username, password).then(data => {
      if (data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        set(req.sessionId, req.session)
        return new SuccessModel(req.session)
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }
}

module.exports = handleUserRouter
