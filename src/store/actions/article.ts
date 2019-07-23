import { createAction } from 'redux-actions'
import { ArticleModel } from '@app/store/models'
import * as API from '../../api'

export namespace ArticleActions {
  export enum Type {
    GET_ARTICLE = 'GET_ARTICLE',
    GET_TAG = 'GET_TAG',
    GET_CATEGORY = 'GET_CATEGORY',
    EDIT_ARTICLE = 'EDIT_ARTICLE',
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    ADD_ARTICLE = 'ADD_ARTICLE',
    UPDATE_ARTICLE = 'UPDATE_ARTICLE',
    PUBLISH_ARTICLE = 'PUBLISH_ARTICLE'
  }

  export const addArticle = createAction<ArticleModel>(Type.ADD_ARTICLE)
  export const deleteArticle = createAction(Type.DELETE_ARTICLE, API.deleteArticl)
  export const getArticle = createAction(Type.GET_ARTICLE, API.fetchArticl)
  export const getCategory = createAction(Type.GET_CATEGORY, API.fetchCategory)
  export const getTag = createAction(Type.GET_TAG, API.fetchTag)

  export const editArticle = createAction<PartialPick<ArticleModel, '_id'>>(Type.EDIT_ARTICLE)
}

export type ArticleActions = omit<typeof ArticleActions, 'Type'>
