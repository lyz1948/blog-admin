import * as actionTypes from '../constants/auth'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  loading: false,
  userInfo: {},
})

export const authReducer = (state = defaultState, action) => {
  if (!action.data) return state
  switch (action.type) {
    case actionTypes.SIGNIN:
      return state.set('userInfo', action.data)

    case actionTypes.LOADING:
      return state.set('loading', action.data)
      
    default:
      return state
  }
}
