export interface CategoryModel {
  _id: string
  name: string
  description: string
  slug: string
  extends?: []
  [propName: string]: any
}

export namespace CategoryModel {
  export enum Filter {
    SHOW_ALL = 'ALL',
    SHOW_PUBLISH = 'PUBLISH',
    SHOW_PUBLIC = 'PUBLIC',
  }
}
