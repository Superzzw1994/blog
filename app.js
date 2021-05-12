const queryString = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const {get, set} = require('./src/db/redis')
const {access} = require('./src/utils/log')
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
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const serverHandle = (req, res) => {
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
  res.setHeader('Content-type', 'application/json')
  req.query = queryString.parse(req.url.split('?')[1])
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    req.cookie[arr[0].trim()] = arr[1].trim()
  })
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    req.sessionId = userId
    set(userId, {})
  }
  get(userId).then(sessionData => {
    if (sessionData === null) {
      set(userId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }
    return getPostData(req)
  }).then(postData => {
    req.body = postData
    const blogData = handleBlogRouter(req, res)
    const userData = handleUserRouter(req, res)
    if (blogData) {
      return blogData.then(data => {
        needSetCookie && res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        needSetCookie = false
        return res.end(JSON.stringify(data))
      })
    }
    if (userData) {
      return userData.then(data => {
        needSetCookie && res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        needSetCookie = false
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
