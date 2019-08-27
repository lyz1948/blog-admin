export interface NavModel {
  component?: any
}

export namespace NavModel {
  export enum Filter {
    DASHBOARD = 'DASHBOARD',
    ARTICLE = 'ARTICLE',
    ARTICLE_ADD = 'ARTICLE_ADD',
    ARTICLE_LIST = 'ARTICLE_LIST',
    ARTICLE_TAG = 'ARTICLE_TAG',
    ARTICLE_CATEGORY = 'ARTICLE_CATEGORY',
    SETTINGS = 'SETTINGS',
  }
}