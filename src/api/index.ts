import axios from 'axios'
import * as CONFIG from '../app.config'
import * as UTILS from '../utils'
import { UserModel } from '@app/store/models'
import { IResponseData } from '@app/store/types'
const token = UTILS.getToken()

const service = axios.create({
  timeout: 5000,
  baseURL: CONFIG.APP.api,
})

service.interceptors.request.use((config: any) => {
  // config.params = Object.assign(config.params || {}, { token })
  config.headers = Object.assign(config.headers || {}, {
    Authorization: 'Bearer ' + token
  })
  return config
})

service.interceptors.response.use((response: any) => {
  if (UTILS.getStatus(response)) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }
})

export const fetchArticl = (): Promise<IResponseData> => {
  return service.get('/article')
}

export const deleteArticl = (id: any): Promise<IResponseData> => {
  console.log('api', id)
  return service.delete(`/article/${id}`)
}

export const fetchCategory = () => {
  return service.get('/category')
}

export const fetchTag = () => {
  return service.get('/tag')
}

export const signIn = (user: UserModel): Promise<UserModel> => {
  return service.post('/user/login', { ...user })
}

export const signUp = (user: UserModel): Promise<UserModel> => {
  return service.post('/user/signup', { ...user })
}