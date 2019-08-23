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
  }
]

export const tagReducer = handleActions<RootState.TagState, TagModel>(
  {
    [TagActions.Type.ADD_TAG]: (state, action) => {
      if (action.payload) {
        return [ action.payload as any, ...state ]
      }
      return state
    },
    [TagActions.Type.GET_TAG]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = action.payload!
        result.map((it: TagModel) => {
          it.isSelected = false
        })
        return [ ...result ]
      }
      return state
    },
    [TagActions.Type.SELECT_TAG]: (state, action) => {
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
    [TagActions.Type.DELETE_TAG]: (state, action) => {
      const { _id: id } = (action.payload as any).result
      return state.filter(tag => tag._id !== id)
    },
    // [TagActions.Type.EDIT_TAG]: (state, action) => {
    //   return state.map(tag => {
    //     if (!tag || !action || !action.payload) {
    //       return tag
    //     }
    //     return tag._id === action.payload._id ? { ...tag } : tag
    //   })
    // },
  },
  initialState,
)
