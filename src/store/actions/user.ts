import { createAction } from 'redux-actions'
import * as API from '../../api'

export namespace UserActions {
  export enum Type {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    FETCH_USER = 'FETCH_USER',
    GET_USER = 'GET_USER',
    UPDATE_USER = 'UPDATE_USER',
  }

  export const signIn = createAction(Type.SIGN_IN, API.signIn)
  export const signUp = createAction(Type.SIGN_UP, API.signUp)
  export const fetchUser = createAction(Type.FETCH_USER, API.fetchUser)
  export const getUser = createAction(Type.GET_USER, API.getUser)
  export const updateUser = createAction(Type.UPDATE_USER, API.updateUser)
}

export type UserActions = omit<typeof UserActions, 'Type'>
