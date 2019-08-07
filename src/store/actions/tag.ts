import * as API from '../../api'
import { createAction } from 'redux-actions'
import { TagModel } from '@app/store/models'

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
  export const deleteTag = createAction<TagModel['id']>(Type.DELETE_TAG)
  export const editTag = createAction<PartialPick<TagModel, 'id'>>(Type.EDIT_TAG)
}

export type TagActions = omit<typeof TagActions, 'Type'>
