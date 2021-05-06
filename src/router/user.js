const {ErrorModel} = require("../model/restModal");
const {SuccessModel} = require("../model/restModal");
const {getPropertyFromRequest} = require("../utils");
const {login} = require('../controller/user')
const handleUserRouter = (req, res) => {
  const {method, path} = getPropertyFromRequest(req)
  if (method === 'POST' && path === '/api/user/login') {
    const {username, password} = req.body
    const result = login(username, password)
    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel('login failed')
    }
  }
}

module.exports = handleUserRouter
