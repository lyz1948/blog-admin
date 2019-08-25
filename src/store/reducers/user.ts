import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { IResponseData } from '../types'
import { UserActions } from '../actions'
import * as CONFIG from '../../config/app.config'

const initialState: RootState.UserState = {
  username: 'root',
  password: 'root',
}

export const userReducer = handleActions<RootState.UserState, IResponseData>(
  {
    [UserActions.Type.SIGN_IN]: (state, action) => {
      if (action.payload) {
        const { data } = (action.payload!)
        // 存储token
        data.result.expires_in = data.result.expires_in * 1000 + Date.now()
        localStorage.setItem(CONFIG.APP.TOKEN_KEY, JSON.stringify(data.result))

        return {
          token: data.result,
          ...state,
        }
      }
      return state
    },
    [UserActions.Type.SIGN_UP]: (state, action) => {
      return state
    },
    [UserActions.Type.FETCH_USER]: (state, action) => {
      return state
    },
    [UserActions.Type.GET_USER]: (state, action) => {
      return state
    },
  },
  initialState,
)
