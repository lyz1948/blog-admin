export interface ArticleModel {
  _id: string
  title: string
  content: string
  description: string
  slug: string
  public: number
  publish: number
  author: string
  tag: string[]
  category: string[]
  extends: []
  keywords: string[]
  meta: any
  origin: 1
  password: string
  state: number
  thumb: string
  [propName: string]: any
  // create_at: Date
  // update_at: Date
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
