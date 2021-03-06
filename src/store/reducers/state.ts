import {
  LoginModel,
  SiteModel,
  UserModel,
  NavModel,
  ArticleDataModel,
  CategoryDataModel,
  TagDataModel,
} from '../models'

export interface RootState {
  categories: RootState.CategoryState
  articles: RootState.ArticleState
  tags: RootState.TagState
  user: RootState.UserState
  nav: RootState.NavState
  login: RootState.UserState
  site: RootState.SiteState
  router?: any
}

export namespace RootState {
  export type CategoryState = CategoryDataModel
  export type ArticleState = ArticleDataModel
  export type TagState = TagDataModel
  export type UserState = UserModel
  export type LoginState = LoginModel
  export type SiteState = SiteModel
  export type NavState = NavModel
}
