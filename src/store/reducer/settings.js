import * as actionTypes from '../constants/settings'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  loading: true,
  avatarData: {},
  siteInfo: {},
  userInfo: {},
})

export const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SITE_INFO:
      case actionTypes.UPDATE_SITE_INFO:
        return state.set('siteInfo', action.data)

      case actionTypes.USER_INFO:
      case actionTypes.UPDATE_USER_INFO:
        return state.set('userInfo', action.data)

      case actionTypes.UPLOAD_AVATAR:
        return state.set('avatarData', action.data)

      case actionTypes.LOADING:
        return state.set('loading', action.data)

    default:
      return state
  }
}
