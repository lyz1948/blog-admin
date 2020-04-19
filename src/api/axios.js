import axios from 'axios'
import * as CONFIG from '../config/app.config'
import { getToken, getStatus, Tips } from '../utils'

const token = getToken()

export const service = axios.create({
  timeout: 5000,
  baseURL: CONFIG.APP.apiUrl,
})

service.interceptors.request.use(config => {
  config.headers = Object.assign(config.headers || {}, {
    Authorization: 'Bearer ' + token,
  })
  return config
}, error => {
  console.log(error)
})

service.interceptors.response.use(
  response => {
    if (getStatus(response)) {
      return Promise.resolve(response.data)
    } else {
      Tips.error(response.message)
      return Promise.reject(response)
    }
  },
  error => {
    const errMsg = error.toString()
    const code = errMsg.substr(errMsg.indexOf('code') + 5)
    if (code === '500') {
      console.log('请求失败')
      // Tips.error('请求错误')
    }
  },
)
