const redis = require('redis')
const {REDIS_CONFIG} = require('../config/db')
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => console.log(err))
const set = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print)
}

const get = key => new Promise((resolve, reject) => {
  redisClient.get(key, (err, value) => {
    if (err) {
      return reject(err)
    }
    if (value === null) {
      return resolve(null)
    }
    console.log(value, 'value')
    try {
      return resolve(JSON.parse(value))
    } catch (e) {
      return resolve(value)
    }
  })
})


module.exports = {
  get,
  set
}
