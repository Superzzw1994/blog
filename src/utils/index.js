const getPropertyFromRequest = (req) => {
  return {
    method: req.method,
    url: req.url,
    path: req.url.split('?')[0]
  }
}

module.exports = {
  getPropertyFromRequest
}
