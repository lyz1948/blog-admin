import { createAction } from 'redux-actions'
import * as API from '@app/api'

export namespace CategoryActions {
  export enum Type {
    BATCH_CATEGORY = 'BATCH_CATEGORY',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    DELETE_CATEGORY = 'DELETE_CATEGORY',
    PUBLISH_CATEGORY = 'PUBLISH_CATEGORY',
    SELECT_CATEGORY = 'SELECT_CATEGORY',
  }

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

export type CategoryActions = omit<typeof CategoryActions, 'Type'>
