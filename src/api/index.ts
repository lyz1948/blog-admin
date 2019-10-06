import axios from 'axios'
import * as CONFIG from '@app/config/app.config'
import { getToken, getStatus, formatQuery } from '@app/utils'
import { IFatchData, IResponseData } from '@app/interfaces/data'
import { UserModel, ArticleModel, TagModel, SiteModel } from '@app/store/models'
const token = getToken()

const service = axios.create({
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
			resolve({ message: '错误了', status: 'fail' })
		)
	}
)

// 获取网站信息
export const fetchSiteInfo = <T>() => {
	return service.get<IFatchData<T>>('/site')
}

// 更新网站信息
export const updateSiteInfo = (option: SiteModel) => {
	return service.put('/site', option)
}

/**
 * 获取文章列表
 */
export const fetchArticle = (querys: object = {}) => {
	const url = `/article`
	const queryUrl = formatQuery(url, querys)
	return service.get(queryUrl)
}

/**
 * 获取文章详情
 */
export const getArticle = (id: any) => {
	return service.get(`/article/${id}`)
}

/**
 * 更新文章
 */
export const updateArticle = (id: any, newArticle: ArticleModel) => {
	return service.put(`/article/${id}`, newArticle)
}

/**
 * 添加文章
 * @param article 文章对象
 */
export const addArticle = (article: ArticleModel) => {
	return service.post('/article', { ...article })
}

// 上传文章缩略图
export const uploadThumb = (file: any): any => {
	return service.post('/upload/article', file)
}

// 上传文章缩略图
export const uploadAvatar = (file: any): any => {
	return service.post('/upload/avatar', file)
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
export const addCategory = (category: any) => {
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
export const fetchTag = <T>(querys: object = {}) => {
	const url = `/tag`
	const queryUrl = formatQuery(url, querys)
	return service.get<IFatchData<T>>(queryUrl)
}

/**
 * 添加标签
 * @param tag 标签对象
 */
export const addTag = (tag: any) => {
	return service.post('/tag', { ...tag })
}

/**
 * 更新标签
 * @param id 标签id
 */

export const updateTag = (newTag: TagModel) => {
	const { _id } = newTag
	return service.put(`/tag/${_id}`, newTag)
}

/**
 * 删除标签
 * @param id 标签id
 */
export const deleteTag = (id: string | number) => {
	return service.delete(`/tag/${id}`)
}

/**
 * 用户登录
 * @param user 用户名和密码
 */
export const signIn = (user: UserModel) => {
	return service.post('/user/signin', { ...user })
}

/**
 * 用户注册
 * @param user 注册用户
 */
export const signUp = (user: UserModel): Promise<UserModel> => {
	return service.post('/user/signup', { ...user })
}

/**
 * 获取用户列表
 */
export const fetchUsers = (): Promise<UserModel> => {
	return service.get('/user')
}

/**
 * 获取指定用户
 * @param id 用户id
 */
export const getUser = (): Promise<IResponseData> => {
	return service.get(`/user/admin`)
}

// 更新用户信息
export const updateUser = (user: UserModel): Promise<UserModel> => {
	return service.put(`/user/profile`, user)
}
