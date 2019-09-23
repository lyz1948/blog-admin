import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { IResponseData } from '../../interfaces/data'
import { UserActions } from '../actions'

const initialState: RootState.UserState = {
	username: '',
	message: '',
	avatar: '',
	error: true,
}

export const userReducer = handleActions<RootState.UserState, IResponseData>(
	{
		[UserActions.Type.FETCH_USER]: (state, action) => {
			return state
		},
		[UserActions.Type.GET_USER]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result, message } = action.payload
				return {
					...state,
					...result,
					message,
					error: false,
				}
			}
			return state
		},
		[UserActions.Type.UPLOAD_AVATAR]: (state, action) => {
			console.log('action', action);
			console.log('state', state);
			
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return {
					...state,
					avatar: result
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
