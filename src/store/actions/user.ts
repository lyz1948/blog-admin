import { createAction } from 'redux-actions'
import * as API from '../../api'

export namespace UserActions {
	export enum Type {
		FETCH_USER = 'FETCH_USER',
		GET_USER = 'GET_USER',
		UPDATE_USER = 'UPDATE_USER',
		INPUT_CHANGE = 'INPUT_CHANGE',
	}

	export const fetchUser = createAction(Type.FETCH_USER, API.fetchUsers)
	export const getUser = createAction(Type.GET_USER, API.getUser)
	export const updateUser = createAction(Type.UPDATE_USER, API.updateUser)
	export const userInputChange = createAction(Type.INPUT_CHANGE)

}

export type UserActions = omit<typeof UserActions, 'Type'>
