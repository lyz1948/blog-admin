import * as actionTypes from '../constants/auth'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  authorized: false,
  userInfo: {},
})

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN:
      return state.set('userInfo', action.data)

    default:
      return state
  }
}
