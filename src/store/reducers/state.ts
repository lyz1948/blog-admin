import { ArticleModel, TodoModel, UserModel, NavModel } from '../models'

export interface RootState {
  articles: RootState.ArticleState
  user: RootState.UserState
  todos: RootState.TodoState
  nav: RootState.NavState
  router?: any
}

export namespace RootState {
  export type ArticleState = ArticleModel[]
  export type TodoState = TodoModel[]
  export type UserState = UserModel
  export type NavState = NavModel
}
