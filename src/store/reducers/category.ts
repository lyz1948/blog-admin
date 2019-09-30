import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { CategoryModel } from '../models'
import { CategoryActions } from '../actions'

const initialState: RootState.CategoryState = [
	{
		name: '生活随笔',
		description: '测试描述',
		slug: 'test slug',
		pid: {},
		extends: [],
		isSelected: false,
	},
]

export const categoryReducer = handleActions<
	RootState.CategoryState,
	CategoryModel
>(
	{
		[CategoryActions.Type.GET_CATEGORY]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { data } = action.payload.result!
				data.map((it: CategoryModel) => {
					it.isSelected = false
				})
				return data
			}
			return state
		},
		[CategoryActions.Type.ADD_CATEGORY]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return [result, ...state]
			}
			return state
		},
		[CategoryActions.Type.SELECT_CATEGORY]: (state, action) => {
			return state.map(category => {
				if (!category || !action || !action.payload) {
					return category
				}
				if (category._id === action.payload._id) {
					category.isSelected = !category.isSelected
				}
				return category
			})
		},
		[CategoryActions.Type.DELETE_CATEGORY]: (state, action) => {
			const { _id: id } = (action.payload as any).result
			return state.filter(category => category._id !== id)
		},
		[CategoryActions.Type.EDIT_CATEGORY]: (state, action) => {
			return state.map(category => {
				if (!category || !action || !action.payload) {
					return category
				}
				return category._id === action.payload._id ? { ...category } : category
			})
		},
	},
	initialState
)
