import { createAction } from 'redux-actions'
import * as API from '@app/api'

export namespace TagActions {
  export enum Type {
    BATCH_TAG = 'BATCH_TAG',
    CREATE_TAG = 'CREATE_TAG',
    DELETE_TAG = 'DELETE_TAG',
    UPDATE_TAG = 'UPDATE_TAG',
    PUBLISH_TAG = 'PUBLISH_TAG',
    SELECT_TAG = 'SELECT_TAG',
  }

  export const createTag = createAction(Type.CREATE_TAG, API.createTag)
  export const batchTag = createAction(Type.BATCH_TAG, API.batchTag)
  export const deleteTag = createAction(Type.DELETE_TAG, API.deleteTag)
  export const updateTag = createAction(Type.UPDATE_TAG, API.updateTag)
  export const selectTag = createAction(Type.SELECT_TAG)
}

export type TagActions = omit<typeof TagActions, 'Type'>
