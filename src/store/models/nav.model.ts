export interface NavModel {
  component?: any
}

export namespace NavModel {
  export enum Filter {
    DASHBOARD = 'DASHBOARD',
    ARTICLE = 'ARTICLE',
    ARTICLE_ADD = 'ARTICLE_ADD',
    ARTICLE_MANAGE = 'ARTICLE_MANAGE',
    CATEGORY = 'CATEGORY',
    CATEGORY_ADD = 'CATEGORY_ADD',
    CATEGORY_MANAGE = 'CATEGORY_MANAGE',
    TAG = 'TAG',
    TAG_ADD = 'TAG_ADD',
    TAG_MANAGE = 'TAG_MANAGE',
  }
}