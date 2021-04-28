const queryString = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  req.query = queryString.parse(req.url.split('?')[0])
  const blogData = handleBlogRouter(req, res)
  const userData = handleUserRouter(req, res)

  if (blogData) {
    return res.end(JSON.stringify(blogData))
  }

  if (userData) {
    return res.end(JSON.stringify(userData))
  }

  res.writeHead(404, {
    "Content-type": "text/plain"
  })
  res.write("404 not found")
  res.end()
}

module.exports = {
  serverHandle
}
