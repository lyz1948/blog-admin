import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { LoginActions } from '../actions'
import { IResponseData } from '@app/interfaces/data'
import * as CONFIG from '@app/config/app.config'

const initialState: RootState.LoginState = {
  expires_in: '',
  access_token: '',
}

export const loginReducer = handleActions<RootState.LoginState, IResponseData>(
  {
    [LoginActions.Type.SIGN_IN]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = action.payload
        // 存储token
        result.expires_in = result.expires_in * 1000 + Date.now()
        localStorage.setItem(CONFIG.APP.tokenKey, JSON.stringify(result))
        return {
          ...state,
          ...result,
        }
      }
      return state
    },
    [LoginActions.Type.SIGN_UP]: (state, action) => {
      return state
    },
  },
  initialState,
)
