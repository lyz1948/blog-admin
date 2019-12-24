import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { IResponseData } from '@app/interfaces/data'
import { UserActions } from '../actions'

const initialState: RootState.UserState = {
  name: '',
  message: '',
  avatar: '',
  error: true,
}

export const userReducer = handleActions<RootState.UserState, IResponseData>(
  {
    [UserActions.Type.FETCH_USER]: (state, action) => {
      return state
    },
    [UserActions.Type.BATCH_USER]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result, message } = action.payload
        return {
          ...result,
          message,
          error: false,
        }
      }
      // return state
    },
    [UserActions.Type.UPLOAD_AVATAR]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = action.payload
        return {
          ...state,
          avatar: result,
        }
      }
      return state
    },
    [UserActions.Type.UPDATE_USER]: (state, action) => {
      const { result, message } = action.payload!
      if (result) {
        return {
          ...state,
          ...result,
          error: false,
          message,
        }
      }

      return { ...state, error: true, message: '密码错误，更新失败！' }
    },
  },
  initialState,
)
