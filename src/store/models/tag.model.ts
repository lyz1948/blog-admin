export interface TagModel {
  id: number
  name: string
  content: string
  description: string
  slug: string
}

export namespace TagModel {
  export enum Filter {
    SHOW_ALL = 'ALL',
  }
}
