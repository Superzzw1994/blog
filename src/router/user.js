const {getPropertyFromRequest} = require("../utils");
const handleUserRouter = (req, res) => {
  const {method, path} = getPropertyFromRequest(req)
  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是登陆的接口'
    }
  }
}

module.exports = handleUserRouter
