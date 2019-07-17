import { createAction } from 'redux-actions'
// import { UserModel } from '@app/store/models'
import * as API from '../../api'

export namespace UserActions {
  export enum Type {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
  }

  export const signIn = createAction(Type.SIGN_IN, API.signIn)
  export const signUp = createAction(Type.SIGN_UP, API.signUp)
}

export type UserActions = omit<typeof UserActions, 'Type'>
