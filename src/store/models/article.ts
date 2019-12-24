export interface ArticleDataModel {
  data: ArticleModel[]
  pagination: any
  result?: any
}

export interface ArticleModel {
  id?: number
  title: string
  content: string
  description: string
  author: string
  keywords: string[]
  category: string[]
  tag?: string[]
  extends?: []
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

  export enum EStatePublic {
    Password = 0, // 密码访问
    Public = 1, // 公开
    Secret = -1, // 隐藏
  }

  export enum EStatePublish {
    Draft = 0, // 草稿
    Published = 1, // 已发布
    Recycle = -1, // 发布过已撤回
  }

  export enum EStateOrigin {
    Original = 0, // 原创
    Reprint = 1, // 装载
    Hybrid = 2, // 混合
  }
}
