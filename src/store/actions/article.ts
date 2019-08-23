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
    PUBLISH_ARTICLE = 'PUBLISH_ARTICLE',
    UPLOAD_ARTICLE_THUMB = 'UPLOAD_ARTICLE_THUMB',
    SELECT_TAG = 'SELECT_TAG',
    SELECT_CATEGORY = 'SELECT_CATEGORY',
  }

  export const addArticle = createAction(Type.ADD_ARTICLE, API.addArticle)
  export const deleteArticle = createAction(Type.DELETE_ARTICLE, API.deleteArticle)
  export const getArticle = createAction(Type.GET_ARTICLE, API.fetchArticle)
  export const getCategory = createAction(Type.GET_CATEGORY, API.fetchCategory)
  export const getTag = createAction(Type.GET_TAG, API.fetchTag)
  export const uplodThumb = createAction(Type.UPLOAD_ARTICLE_THUMB, API.uploadThumb)
  export const selectTag = createAction(Type.SELECT_TAG)
  export const selectCategory = createAction(Type.SELECT_CATEGORY)
  export const editArticle = createAction<PartialPick<ArticleModel, '_id'>>(Type.EDIT_ARTICLE)
}

export type ArticleActions = omit<typeof ArticleActions, 'Type'>
