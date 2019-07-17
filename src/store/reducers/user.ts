import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { IResponseData } from '../types'
import { UserActions } from '../actions'

const initialState: RootState.UserState = {
  username: 'root',
  password: 'root',
}

export const userReducer = handleActions<RootState.UserState, IResponseData>(
  {
    [UserActions.Type.SIGN_IN]: (state, action) => {
      if (action.payload) {
        const { data } = (action.payload!)
        return {
          data: data.result,
          ...state,
        }
      }
      return state
    },
    [UserActions.Type.SIGN_UP]: (state, action) => {
      return state
    },
  },
  initialState,
)
