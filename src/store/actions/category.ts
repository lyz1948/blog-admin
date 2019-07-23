import { createAction } from 'redux-actions'
import { CategoryModel } from '@app/store/models'
import * as API from '../../api'

export namespace CategoryActions {
  export enum Type {
    GET_CATEGORY = 'GET_CATEGORY',
    EDIT_CATEGORY = 'EDIT_CATEGORY',
    DELETE_CATEGORY = 'DELETE_CATEGORY',
    ADD_CATEGORY = 'ADD_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    PUBLISH_CATEGORY = 'PUBLISH_CATEGORY'
  }

  // export const addCategory = createAction<CategoryModel>(Type.ADD_CATEGORY)
  export const deleteCategory = createAction(Type.DELETE_CATEGORY, API.deleteCategory)
  export const getCategory = createAction(Type.GET_CATEGORY, API.fetchCategory)

  export const editCategory = createAction<PartialPick<CategoryModel, '_id'>>(Type.EDIT_CATEGORY)
}

export type CategoryActions = omit<typeof CategoryActions, 'Type'>
