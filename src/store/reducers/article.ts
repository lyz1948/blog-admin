import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { ArticleDataModel } from '../models'
import { ArticleActions } from '../actions'

const initialState: RootState.ArticleState = {
	data: [],
	pagination: {}
}

export const articleReducer = handleActions<
	RootState.ArticleState,
	ArticleDataModel
>(
	{
		[ArticleActions.Type.BATCH_ARTICLE]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return {
					...state,
					...result
				}
			}
			return state
		},
		[ArticleActions.Type.FETCH_ARTICLE]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return result
			}
			// return state
		},
		[ArticleActions.Type.CREATE_ARTICLE]: (state, action) => {
			if (action.payload && action.payload.result) {
				return action.payload.result
			}
			return state
		},
		[ArticleActions.Type.DELETE_ARTICLE]: (state, action) => {
			const { result } = action.payload!

			state.data.map((article, index) => {
				if (article._id === result) {
					state.data.splice(index, 1)
				}
			})
			return {
				data: state.data,
				pagination: state.pagination
			}
		},
		[ArticleActions.Type.UPDATE_ARTICLE]: (state, action) => {
			const { result } = action.payload!

			state.data.map((article, index) => {
				if (article._id == result._id) {
					state.data.splice(index, 1)
				}
			})
			return {
				data: state.data,
				pagination: state.pagination
			}
		},
		[ArticleActions.Type.UPLOAD_ARTICLE_THUMB]: (state, action) => {
			// if (action.payload && action.payload.result) {
			// 	const { result } = action.payload!
			// 	initialState[0].thumb = result
			// 	return { ...initialState, ...{ thumb: result }, ...state }
			// }
			return state
		},
	},
	initialState
)
