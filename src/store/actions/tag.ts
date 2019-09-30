import { createAction } from 'redux-actions'
import * as API from '@app/api'

export namespace TagActions {
	export enum Type {
		GET_TAG = 'GET_TAG',
		ADD_TAG = 'ADD_TAG',
		DELETE_TAG = 'DELETE_TAG',
		UPDATE_TAG = 'UPDATE_TAG',
		PUBLISH_TAG = 'PUBLISH_TAG',
		SELECT_TAG = 'SELECT_TAG',
	}

	export const addTag = createAction(Type.ADD_TAG, API.addTag)
	export const getTag = createAction(Type.GET_TAG, API.fetchTag)
	export const deleteTag = createAction(Type.DELETE_TAG, API.deleteTag)
	export const updateTag = createAction(Type.UPDATE_TAG, API.updateTag)
	export const selectTag = createAction(Type.SELECT_TAG)
}

export type TagActions = omit<typeof TagActions, 'Type'>
