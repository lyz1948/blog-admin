import axios from 'axios'
import * as CONFIG from '@app/config/app.config'
import { getToken, getStatus } from '@app/utils'

const token = getToken()

export const service = axios.create({
  timeout: 5000,
  baseURL: CONFIG.APP.apiUrl,
})

service.interceptors.request.use((config: any) => {
  config.headers = Object.assign(config.headers || {}, {
    Authorization: 'Bearer ' + token,
  })
  return config
})

service.interceptors.response.use(
  (response: any) => {
    if (getStatus(response)) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    const errMsg = error.toString()
    const code = errMsg.substr(errMsg.indexOf('code') + 5)
    if (code === '500') {
      console.log('500 错误了')
    }
    return new Promise(resolve =>
      resolve({ message: '错误了', status: 'fail' }),
    )
  },
)
