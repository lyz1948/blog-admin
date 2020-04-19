import { service } from './axios'
import { formatQuery } from '../utils'

// 获取网站信息
export const fetchSite = () => {
  return service.get('site')
}

// 更新网站信息
export const updateSite = option => {
  return service.put('site', option)
}

/**
 * 获取文章列表
 */
export const fetchArticleList = querys => {
  const url = `article`
  const queryUrl = formatQuery(url, querys)
  return service.get(queryUrl)
}

/**
 * 获取文章详情
 */
export const fetchArticle = id => {
  return service.get(`article/${id}`)
}

/**
 * 添加文章
 * @param article 文章对象
 */
export const createArticle = article => {
  return service.post('article', { ...article })
}

/**
 * 删除指定id文章
 * @param id 文章id
 */
export const deleteArticle = id => {
  return service.delete(`article/${id}`)
}

/**
 * 更新文章
 */
export const updateArticle = (id, newArticle) => {
  return service.put(`article/${id}`, newArticle)
}

// 上传文章缩略图
export const uploadThumb = file => {
  return service.post('upload/article', file)
}

// 上传头像
export const uploadAvatar = file => {
  return service.post('upload/avatar', file)
}

/**
 * 获取文章分类
 */
export const fetchCategoryList = (querys = {}) => {
  const url = 'category'
  const queryUrl = formatQuery(url, querys)
  return service.get(queryUrl)
}

/**
 * 添加分类
 * @param category 分类对象
 */
export const createCategory = category => {
  return service.post('category', { ...category })
}

/**
 * 更新分类
 * @param category 分类对象
 */
export const updateCategory = category => {
  const { id } = category
  return service.put(`category/${id}`, { ...category })
}

/**
 * 删除分类
 * @param id 分类id
 */
export const deleteCategory = id => {
  return service.delete(`category/${id}`)
}

/**
 * 获取文章的标签
 */
export const fetchTagList = (querys = {}) => {
  const url = `tag`
  const queryUrl = formatQuery(url, querys)
  return service.get(queryUrl)
}

/**
 * 添加标签
 * @param tag 标签对象
 */
export const createTag = tag => {
  return service.post('tag', { ...tag })
}

/**
 * 更新标签
 * @param id 标签id
 */

export const updateTag = newTag => {
  const { _id } = newTag
  return service.put(`tag/${_id}`, newTag)
}

/**
 * 删除标签
 * @param id 标签id
 */
export const deleteTag = id => {
  return service.delete(`tag/${id}`)
}

/**
 * 用户登录
 * @param user 用户名和密码
 */
export const signIn = user => {
  return service.post('user/signin', { ...user }).catch(err => {
    console.log('error', err)
  })
}

/**
 * 用户注册
 * @param user 注册用户
 */
export const signUp = user => {
  return service.post('user/signup', { ...user })
}

/**
 * 获取用户列表
 */
export const fetchUserList = () => {
  return service.get('user')
}

/**
 * 获取指定用户
 * @param id 用户id
 */
export const fetchUser = () => {
  return service.get(`user/admin`)
}

// 更新用户信息
export const updateUser = user => {
  return service.put(`user/profile`, user)
}
