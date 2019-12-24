import { createAction } from 'redux-actions'
import * as API from '@app/api'

export namespace SiteActions {
  export enum Type {
    GET = 'GET',
    UPDATE = 'UPDATE',
  }

  export const fetchSiteInfo = createAction(Type.GET, API.fetchSiteInfo)
  export const updateSiteInfo = createAction(Type.UPDATE, API.updateSiteInfo)
}

export type SiteActions = omit<typeof SiteActions, 'Type'>
