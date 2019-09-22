import {
	LoginModel,
	UserModel,
	TagModel,
	NavModel,
	ArticleModel,
	CategoryModel,
} from '../models'

export interface RootState {
	categories: RootState.CategoryState
	articles: RootState.ArticleState
	tags: RootState.TagState
	user: RootState.UserState
	nav: RootState.NavState
	login: RootState.UserState
	router?: any
}

export namespace RootState {
	export type CategoryState = CategoryModel[]
	export type ArticleState = ArticleModel[]
	export type TagState = TagModel[]
	export type UserState = UserModel
	export type LoginState = LoginModel
	export type NavState = NavModel
}
