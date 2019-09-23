import { createAction } from 'redux-actions'
import * as API from '../../api'

export namespace SiteActions {
	export enum Type {
		GET = 'GET',
		UPDATE = 'UPDATE'
	}

	export const getSiteInfo = createAction(Type.GET, API.fetchSiteInfo)
	export const updateSiteInfo = createAction(Type.UPDATE, API.updateSiteInfo)
}

export type SiteActions = omit<typeof SiteActions, 'Type'>