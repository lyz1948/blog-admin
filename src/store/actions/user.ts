import { createAction } from 'redux-actions'
import * as API from '@app/api'

export namespace UserActions {
  export enum Type {
    BATCH_USER = 'BATCH_USER',
    FETCH_USER = 'FETCH_USER',
    UPDATE_USER = 'UPDATE_USER',
    UPLOAD_AVATAR = 'UPLOAD_AVATAR',
  }

  export const batchUser = createAction(Type.BATCH_USER, API.batchUsers)
  export const fetchUser = createAction(Type.FETCH_USER, API.fetchUser)
  export const updateUser = createAction(Type.UPDATE_USER, API.updateUser)
}

export type UserActions = omit<typeof UserActions, 'Type'>
