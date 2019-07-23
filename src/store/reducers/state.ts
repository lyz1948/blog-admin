import {
  ArticleModel,
  TodoModel,
  UserModel,
  NavModel,
  CategoryModel,
  TagModel,
} from '../models'

export interface RootState {
  articles: RootState.ArticleState
  categories: RootState.CategoryState
  tags: RootState.TagState
  user: RootState.UserState
  todos: RootState.TodoState
  nav: RootState.NavState
  router?: any
}

export namespace RootState {
  export type ArticleState = ArticleModel[]
  export type CategoryState = CategoryModel[]
  export type TagState = TagModel[]
  export type TodoState = TodoModel[]
  export type UserState = UserModel
  export type NavState = NavModel
}
