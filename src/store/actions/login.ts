import { createAction } from 'redux-actions'
import * as API from '@app/api'

export namespace LoginActions {
	export enum Type {
		SIGN_IN = 'SIGN_IN',
		SIGN_UP = 'SIGN_UP',
	}

	export const signIn = createAction(Type.SIGN_IN, API.signIn)
	export const signUp = createAction(Type.SIGN_UP, API.signUp)
}

export type LoginActions = omit<typeof LoginActions, 'Type'>
