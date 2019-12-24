import { createAction } from 'redux-actions'
import * as API from '@app/api'

export namespace ArticleActions {
  export enum Type {
    BATCH_ARTICLE = 'BATCH_ARTICLE',
    FETCH_ARTICLE = 'FETCH_ARTICLE',
    CREATE_ARTICLE = 'CREATE_ARTICLE',
    UPDATE_ARTICLE = 'UPDATE_ARTICLE',
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    UPLOAD_ARTICLE_THUMB = 'UPLOAD_ARTICLE_THUMB',

    FETCH_SITE_INFO = 'FETCH_SITE_INFO',
    UPDATE_SITE_INFO = 'UPDATE_SITE_INFO',

    FETCH_USER = 'FETCH_USER',
    UPDATE_USER = 'UPDATE_USER',
    UPLOAD_AVATAR = 'UPLOAD_AVATAR',

    BATCH_TAG = 'BATCH_TAG',
    CREATE_TAG = 'CREATE_TAG',
    DELETE_TAG = 'DELETE_TAG',
    UPDATE_TAG = 'UPDATE_TAG',
    PUBLISH_TAG = 'PUBLISH_TAG',
    SELECT_TAG = 'SELECT_TAG',

    BATCH_CATEGORY = 'BATCH_CATEGORY',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    DELETE_CATEGORY = 'DELETE_CATEGORY',
    SELECT_CATEGORY = 'SELECT_CATEGORY',
  }

  // ARTICLE
  export const batchArticle = createAction(Type.FETCH_ARTICLE, API.batchArticle)
  export const fetchArticle = createAction(Type.FETCH_ARTICLE, API.fetchArticle)
  export const createArticle = createAction(
    Type.CREATE_ARTICLE,
    API.createArticle,
  )
  export const updateArticle = createAction(
    Type.UPDATE_ARTICLE,
    API.updateArticle,
  )
  export const deleteArticle = createAction(
    Type.DELETE_ARTICLE,
    API.deleteArticle,
  )
  export const uplodThumb = createAction(
    Type.UPLOAD_ARTICLE_THUMB,
    API.uploadThumb,
  )

  // SITE
  export const fetchSiteInfo = createAction(
    Type.FETCH_SITE_INFO,
    API.fetchSiteInfo,
  )
  export const updateSiteInfo = createAction(
    Type.UPDATE_SITE_INFO,
    API.updateSiteInfo,
  )

  // USER
  export const fetchUser = createAction(Type.FETCH_USER, API.fetchUser)
  export const updateUser = createAction(Type.UPDATE_USER, API.updateUser)
  export const uploadAvatar = createAction(Type.UPLOAD_AVATAR, API.uploadAvatar)

  // TAG
  export const batchTag = createAction(Type.BATCH_TAG, API.batchTag)
  export const deleteTag = createAction(Type.DELETE_TAG, API.deleteTag)
  export const updateTag = createAction(Type.UPDATE_TAG, API.updateTag)
  export const createTag = createAction(Type.CREATE_TAG, API.createTag)
  export const selectTag = createAction(Type.SELECT_TAG)

  // CATEGORY

  export const batchCategory = createAction(
    Type.BATCH_CATEGORY,
    API.batchCategory,
  )
  export const createCategory = createAction(
    Type.CREATE_CATEGORY,
    API.createCategory,
  )
  export const updateCategory = createAction(
    Type.UPDATE_CATEGORY,
    API.updateCategory,
  )
  export const deleteCategory = createAction(
    Type.DELETE_CATEGORY,
    API.deleteCategory,
  )
  export const selectCategory = createAction(Type.SELECT_CATEGORY)
}

export type ArticleActions = omit<typeof ArticleActions, 'Type'>
