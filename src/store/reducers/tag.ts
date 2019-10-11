import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { TagModel, TagDataModel } from '../models'
import { TagActions } from '../actions'

const initialState: RootState.TagState = {
	data: [],
	pagination: {}
}

export const tagReducer = handleActions<RootState.TagState, TagDataModel>(
	{
		[TagActions.Type.GET_TAG]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				result.data.map((it: TagModel) => {
					it.isSelected = false
				})
				return {
					...state,
					...result
				}
			}
			return state
		},
		[TagActions.Type.ADD_TAG]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return {
					...state,
					...result
				}
			}
			return state
		},
		[TagActions.Type.SELECT_TAG]: (state, action) => {
			state.data.map((tag: TagModel) => {
				if (action.payload) {
					if (tag._id == action.payload) {
						tag.isSelected = !tag.isSelected
					}
				} else {
					// 清空所有选中的tag
					tag.isSelected = false
				}
			})
			return {
				data: state.data,
				pagination: state.pagination
			}
		},
		[TagActions.Type.DELETE_TAG]: (state, action) => {
			const { _id: id } = (action.payload as any).result
			state.data = state.data.filter(tag => tag._id !== id)
			return state
		},
		[TagActions.Type.UPDATE_TAG]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				state.data.map((tag, index) => {
					if (tag._id === result._id) {
						state.data.splice(index, 1, result)
					}
				})
			}
			return state
		},
	},
	initialState
)
