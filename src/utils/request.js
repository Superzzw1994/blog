import axios from 'axios'

export const clientInstance = axios.create({
  baseURL: '/'
})

export const serverInstance = axios.create({
  baseURL: 'http://47.95.113.63/ssr'
})
