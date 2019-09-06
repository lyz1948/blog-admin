import { createAction } from 'redux-actions'
import { ArticleModel, CategoryModel } from '@app/store/models'
import * as API from '../../api'

export namespace ArticleActions {
  export enum Type {
    GET_ARTICLE_LIST = 'GET_ARTICLE_LIST',
    GET_ARTICLE = 'GET_ARTICLE',
    ADD_ARTICLE = 'ADD_ARTICLE',
    EDIT_ARTICLE = 'EDIT_ARTICLE',
    UPDATE_ARTICLE = 'UPDATE_ARTICLE',
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    UPLOAD_ARTICLE_THUMB = 'UPLOAD_ARTICLE_THUMB',
    
    GET_USER = 'GET_USER',
    UPDATE_USER = 'UPDATE_USER',
    
    GET_TAG = 'GET_TAG',
    ADD_TAG = 'ADD_TAG',
    DELETE_TAG = 'DELETE_TAG',
    UPDATE_TAG = 'UPDATE_TAG',
    PUBLISH_TAG = 'PUBLISH_TAG',
    SELECT_TAG = 'SELECT_TAG',
    
    GET_CATEGORY = 'GET_CATEGORY',
    ADD_CATEGORY = 'ADD_CATEGORY',
    EDIT_CATEGORY = 'EDIT_CATEGORY',
    DELETE_CATEGORY = 'DELETE_CATEGORY',
    SELECT_CATEGORY = 'SELECT_CATEGORY',
  }
  // ARTICLE
  export const getArticleList = createAction(Type.GET_ARTICLE_LIST, API.fetchArticle)
  export const getArticle = createAction(Type.GET_ARTICLE, API.getArticle)
  export const addArticle = createAction(Type.ADD_ARTICLE, API.addArticle)
  export const deleteArticle = createAction(Type.DELETE_ARTICLE, API.deleteArticle)
  export const uplodThumb = createAction(Type.UPLOAD_ARTICLE_THUMB, API.uploadThumb)
  export const editArticle = createAction<PartialPick<ArticleModel, '_id'>>(Type.EDIT_ARTICLE)
  
  // USER
  export const getUser = createAction(Type.GET_USER, API.getUser)
  export const updateUser = createAction(Type.UPDATE_USER, API.updateUser)
  
  // TAG
  export const getTag = createAction(Type.GET_TAG, API.fetchTag)
  export const selectTag = createAction(Type.SELECT_TAG)
  export const addTag = createAction(Type.ADD_TAG, API.addTag)
  export const deleteTag = createAction(Type.DELETE_TAG, API.deleteTag)
  export const updateTag = createAction(Type.UPDATE_TAG, API.updateTag)

  // CATEGORY
  export const deleteCategory = createAction(Type.DELETE_CATEGORY, API.deleteCategory)
  export const getCategory = createAction(Type.GET_CATEGORY, API.fetchCategory)
  export const addCategory = createAction(Type.GET_CATEGORY, API.addCategory)
  export const selectCategory = createAction(Type.SELECT_CATEGORY)
  export const editCategory = createAction<PartialPick<CategoryModel, '_id'>>(Type.EDIT_CATEGORY)
}

export type ArticleActions = omit<typeof ArticleActions, 'Type'>
