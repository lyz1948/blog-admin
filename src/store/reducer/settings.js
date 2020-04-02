import * as actionTypes from '../constants/settings'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  siteInfo: {},
  userProfile: {},
})

export const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SITE_INFO:
      return state.set('siteInfo', action.data)

    default:
      return state
  }
}
