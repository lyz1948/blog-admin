import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { IResponseData } from '../types'
import { UserActions } from '../actions'
import * as CONFIG from '../../config/app.config'

const initialState: RootState.UserState = {
  name: 'root',
  password: 'root',
}

export const userReducer = handleActions<RootState.UserState, IResponseData>(
  {
    [UserActions.Type.SIGN_IN]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = (action.payload!)
        // 存储token
        result.expires_in = result.expires_in * 1000 + Date.now()
        localStorage.setItem(CONFIG.APP.TOKEN_KEY, JSON.stringify(result))

        return {
          data: result,
          ...state,
        }
      }
      
      return { ...state, ...{ error: true, message: '用户名密码错误' }}
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
    [UserActions.Type.UPDATE_USER]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = (action.payload!)
        
        return {
          ...state,
          data: result,
        }
      }
      return state
    },
  },
  initialState,
)
