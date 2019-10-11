import { service } from './axios'
import { IResponseData } from '@app/interfaces/data'
import { UserModel, ArticleModel, TagModel, SiteModel } from '@app/store/models'
import { formatQuery } from '@app/utils'

// 获取网站信息
export const fetchSiteInfo = () => {
	return service.get<IResponseData>('site')
}

// 更新网站信息
export const updateSiteInfo = (option: SiteModel) => {
	return service.put('site', option)
}

/**
 * 获取文章列表
 */
export const batchArticle = (querys: any) => {
	const url = `article`
	const queryUrl = formatQuery(url, querys)
	return service.get(queryUrl)
}

/**
 * 获取文章详情
 */
export const fetchArticle = (id: any) => {
	return service.get(`article/${id}`)
}

/**
 * 添加文章
 * @param article 文章对象
 */
export const createArticle = (article: ArticleModel) => {
	return service.post('article', { ...article })
}

/**
 * 删除指定id文章
 * @param id 文章id
 */
export const deleteArticle = (id: any): Promise<IResponseData> => {
	return service.delete(`article/${id}`)
}

/**
 * 更新文章
 */
export const updateArticle = (id: any, newArticle: ArticleModel) => {
	return service.put(`article/${id}`, newArticle)
}

// 上传文章缩略图
export const uploadThumb = (file: any): any => {
	return service.post('upload/article', file)
}

// 上传文章缩略图
export const uploadAvatar = (file: any): any => {
	return service.post('upload/avatar', file)
}

/**
 * 获取文章分类
 */
export const batchCategory = (querys: object = {}) => {
	const url = `category`
	const queryUrl = formatQuery(url, querys)
	return service.get<IResponseData>(queryUrl)
}

/**
 * 添加分类
 * @param category 分类对象
 */
export const createCategory = (category: any) => {
	return service.post('category', { ...category })
}

/**
 * 更新分类
 * @param category 分类对象
 */
export const updateCategory = (category: any) => {
	const { id } = category
	return service.put(`category/${id}`, { ...category })
}

/**
 * 删除分类
 * @param id 分类id
 */
export const deleteCategory = (id: string) => {
	return service.delete(`category/${id}`)
}

/**
 * 获取文章的标签
 */
export const batchTag = (querys: object = {}) => {
	const url = `tag`
	const queryUrl = formatQuery(url, querys)
	return service.get<IResponseData>(queryUrl)
}

/**
 * 添加标签
 * @param tag 标签对象
 */
export const createTag = (tag: any) => {
	return service.post('tag', { ...tag })
}

/**
 * 更新标签
 * @param id 标签id
 */

export const updateTag = (newTag: TagModel) => {
	const { _id } = newTag
	return service.put(`tag/${_id}`, newTag)
}

/**
 * 删除标签
 * @param id 标签id
 */
export const deleteTag = (id: string | number) => {
	return service.delete(`tag/${id}`)
}

/**
 * 用户登录
 * @param user 用户名和密码
 */
export const signIn = (user: UserModel): Promise<IResponseData> => {
	return service.post('user/signin', { ...user })
}

/**
 * 用户注册
 * @param user 注册用户
 */
export const signUp = (user: UserModel): Promise<UserModel> => {
	return service.post('user/signup', { ...user })
}

/**
 * 获取用户列表
 */
export const batchUsers = (): Promise<UserModel> => {
	return service.get('user')
}

/**
 * 获取指定用户
 * @param id 用户id
 */
export const fetchUser = (): Promise<IResponseData> => {
	return service.get(`user/admin`)
}

// 更新用户信息
export const updateUser = (user: UserModel): Promise<UserModel> => {
	return service.put(`user/profile`, user)
}
