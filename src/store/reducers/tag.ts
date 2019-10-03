import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { TagModel } from '../models'
import { TagActions } from '../actions'

const initialState: RootState.TagState = [
	{
		name: 'tag name',
		slug: 'tag slug',
		description: 'tag description',
		extends: [],
		isSelected: false,
	},
]

export const tagReducer = handleActions<RootState.TagState, TagModel>(
	{
		[TagActions.Type.GET_TAG]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { data } = action.payload.result!
				data.map((it: TagModel) => {
					it.isSelected = false
				})
				return [...data]
			}
			return state
		},
		[TagActions.Type.ADD_TAG]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return [result, ...state]
			}
			return state
		},
		[TagActions.Type.SELECT_TAG]: (state, action) => {
			return state.map(tag => {
				if (!tag || !action || !action.payload) {
					return tag
				}
				if (action.payload._id) {

					if (tag._id === action.payload._id) {
						tag.isSelected = !tag.isSelected
					}
				} else {
					// 清空所有选中的tag
					tag.isSelected = false
				}
				return tag
			})
		},
		[TagActions.Type.DELETE_TAG]: (state, action) => {
			const { _id: id } = (action.payload as any).result
			return state.filter(tag => tag._id !== id)
		},
		[TagActions.Type.UPDATE_TAG]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				state.map((tag, index) => {
					if (tag._id === result._id) {
						state.splice(index, 1, result)
					}
				})
			}
			return state
		},
	},
	initialState
)
