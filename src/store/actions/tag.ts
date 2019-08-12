import * as API from '../../api'
import { createAction } from 'redux-actions'

export namespace TagActions {
  export enum Type {
    GET_TAG = 'GET_TAG',
    EDIT_TAG = 'EDIT_TAG',
    DELETE_TAG = 'DELETE_TAG',
    ADD_TAG = 'ADD_TAG',
    UPDATE_TAG = 'UPDATE_TAG',
    PUBLISH_TAG = 'PUBLISH_TAG'
  }

  export const addTag = createAction(Type.ADD_TAG, API.addTag)
  export const getTag = createAction(Type.GET_TAG, API.fetchTag)
  export const deleteTag = createAction(Type.DELETE_TAG, API.deleteTag)
  export const editTag = createAction(Type.EDIT_TAG)
  export const updateTag = createAction(Type.EDIT_TAG, API.updateTag)
}

export type TagActions = omit<typeof TagActions, 'Type'>
