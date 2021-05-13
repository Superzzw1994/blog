
const express = require('express')
const router = express.Router()

router.get('/list', (req, res, next) => {
  res.json({errno: 1, data: [1, 2, 3]})
})

module.exports = router
