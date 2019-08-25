export interface TagModel {
  _id?: string
  name: string
  slug: string
  description: string
  extends: []
  [propName: string]: any
}

export namespace TagModel {
  export enum Filter {
    SHOW_ALL = 'ALL',
  }
}
