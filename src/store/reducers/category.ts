import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { CategoryModel } from '../models'
import { CategoryActions } from '../actions'

const initialState: RootState.CategoryState = [
  {
    _id: '123432',
    name: '生活随笔',
    description: '测试描述',
    slug: 'test slug',
  }
]

export const categoryReducer = handleActions<RootState.CategoryState, CategoryModel>(
  {
    [CategoryActions.Type.ADD_CATEGORY]: (state, action) => {
      return state
    },
    [CategoryActions.Type.GET_CATEGORY]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = action.payload!
        return [ ...result ]
      }
      return state
    },
    [CategoryActions.Type.DELETE_CATEGORY]: (state, action) => {
      return state.filter(category => category._id !== (action.payload as any))
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
  initialState,
)
