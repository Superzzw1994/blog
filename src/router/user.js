const {ErrorModel} = require("../model/restModal");
const {SuccessModel} = require("../model/restModal");
const {getPropertyFromRequest} = require("../utils");
const {login} = require('../controller/user')
const handleUserRouter = (req, res) => {
  const {method, path} = getPropertyFromRequest(req)
  if (method === 'POST' && path === '/api/user/login') {
    const {username, password} = req.body
    return login(username, password).then(res => {
      if (res.username) {
        return new SuccessModel('登陆成功')
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }
}

module.exports = handleUserRouter
