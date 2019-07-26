import axios from 'axios'
import * as CONFIG from '../app.config'
import * as UTILS from '../utils'
import { IResponseData } from '@app/store/types'
import { UserModel, ArticleModel } from '@app/store/models'

const token = UTILS.getToken()

const service = axios.create({
  timeout: 5000,
  baseURL: CONFIG.APP.api,
})

service.interceptors.request.use((config: any) => {
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

interface IFatchData<T = any> {
  message: string
  result: T
  status: string
}
/**
 * 获取文章列表
 */
export const fetchArticle = <T>() => {
  return service.get<IFatchData<T>>('/article')
}

/**
 * 添加文章
 * @param article 文章对象
 */
export const addArticle = (article: ArticleModel) => {
  return service.post('/article', { ...article })
}

/**
 * 删除指定id文章
 * @param id 文章id
 */
export const deleteArticle = (id: any): Promise<IResponseData> => {
  return service.delete(`/article/${id}`)
}

/**
 * 获取文章分类
 */
export const fetchCategory = <T>() => {
  return service.get<IFatchData<T>>('/category')
}

/**
 * 添加分类
 * @param category 分类对象
 */
export const addCategory = (category: any): Promise<IResponseData> => {
  return service.post('/category', { ...category })
}

/**
 * 删除分类
 * @param id 分类id
 */
export const deleteCategory = (id: any) => {
  return service.delete(`/category/${id}`)
}

/**
 * 获取文章的标签
 */
export const fetchTag = <T>() => {
  return service.get<IFatchData<T>>('/tag')
}

/**
 * 用户登录
 * @param user 用户名和密码
 */
export const signIn = (user: UserModel): Promise<UserModel> => {
  return service.post('/user/login', { ...user })
}

/**
 * 用户注册
 * @param user 注册用户
 */
export const signUp = (user: UserModel): Promise<UserModel> => {
  return service.post('/user/signup', { ...user })
}