export interface ArticleModel {
  id?: number
  _id?: string
  title: string
  content: string
  description: string
  slug: string
  author: string
  tag: string[]
  category: string[]
  extends?: []
  keywords: string[]
  meta?: any
  public: number
  origin: number
  state: number
  password?: string
  thumb: string
  [propName: string]: any
}

export namespace ArticleModel {
  export enum Filter {
    SHOW_ALL = 'ALL',
    SHOW_PUBLISH = 'PUBLISH',
    SHOW_PUBLIC = 'PUBLIC',
  }
  export enum State {
    Password = 0,
    Public = 1,
    Secret = -1,
  }
}
