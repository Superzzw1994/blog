const queryString = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const getPostData = (req) => new Promise((resolve, reject) => {
  if (req.method !== 'POST') {
    return resolve({})
  }
  if (req.headers['content-type'] !== 'application/json') {
    return resolve({})
  }
  let postData = ''
  req.on('data', chunk => postData += chunk.toString())
  req.on('end', () => {
    if (!postData) {
      return resolve({})
    }
    resolve(JSON.parse(postData))
  })
})
const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  req.query = queryString.parse(req.url.split('?')[1])
  getPostData(req).then(postData => {
    req.body = postData
    const blogData = handleBlogRouter(req, res)
    const userData = handleUserRouter(req, res)
    if (blogData) {
      return blogData.then(data => {
        return res.end(JSON.stringify(data))
      })
    }
    if (userData) {
      return userData.then(data => {
        return res.end(JSON.stringify(data))
      })
    }
    res.writeHead(404, {
      "Content-type": "text/plain"
    })
    res.write("404 not found")
    res.end()
  })
}

module.exports = {
  serverHandle
}
