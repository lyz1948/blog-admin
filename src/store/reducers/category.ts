import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { CategoryDataModel } from '../models'
import { CategoryActions } from '../actions'

const initialState: RootState.CategoryState = {	
	data: [],
	pagination: {}
}
	// {
	// 	name: '生活随笔',
	// 	description: '测试描述',
	// 	slug: 'test slug',
	// 	pid: {},
	// 	extends: [],
	// 	isSelected: false,
	// },


export const categoryReducer = handleActions<
	RootState.CategoryState,
	CategoryDataModel
>(
	{
		[CategoryActions.Type.GET_CATEGORY]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				const { data } = result
				data.map((it: any) => {
					it.isSelected = false
				})
				return {
					...state,
					...result
				}
			}
			return state
		},
		[CategoryActions.Type.ADD_CATEGORY]: (state, action) => {
			if (action.payload && action.payload.result) {
				return action.payload.result
			}
			return state
		},
		[CategoryActions.Type.SELECT_CATEGORY]: (state, action) => {
			// state.data.map((category: any) => {
			// 	if (!category || !action || !action.payload) {
			// 		return category
			// 	}
			// 	if (action.payload._id) {
			// 		if (category._id === action.payload._id) {
			// 			category.isSelected = !category.isSelected
			// 		}
			// 	} else {
			// 		// 如果没有传id, 表示要置空所有选中
			// 		category.isSelected = false
			// 	}
			// 	return state
			// })
			return state
		},
		[CategoryActions.Type.DELETE_CATEGORY]: (state, action) => {
			// const { _id: id } = (action.payload as any).result
			// state.data = state.data.filter((category: any) => category._id !== id)
			return state
		},
		[CategoryActions.Type.EDIT_CATEGORY]: (state, action) => {
			return state
		},
	},
	initialState
)
