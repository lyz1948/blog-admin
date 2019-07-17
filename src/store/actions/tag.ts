import { createAction } from 'redux-actions'
import { TagModel } from '@app/store/models'

export namespace TagActions {
  export enum Type {
    GET_ARTICLE = 'GET_ARTICLE',
    EDIT_ARTICLE = 'EDIT_ARTICLE',
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    ADD_ARTICLE = 'ADD_ARTICLE',
    UPDATE_ARTICLE = 'UPDATE_ARTICLE',
    PUBLISH_ARTICLE = 'PUBLISH_ARTICLE'
  }

  export const addArticle = createAction<TagModel>(Type.ADD_ARTICLE)
  export const deleteArticle = createAction<TagModel['id']>(Type.DELETE_ARTICLE)
  export const getArticle = createAction(Type.GET_ARTICLE)
  export const editArticle = createAction<PartialPick<TagModel, 'id'>>(Type.EDIT_ARTICLE)
}

export type TagActions = omit<typeof TagActions, 'Type'>
