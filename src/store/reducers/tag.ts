import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { TagModel } from '../models'
import { TagActions } from '../actions'

const initialState: RootState.TagState = [
  {
    _id: '12323',
    name: 'tag name',
    slug: 'tag slug',
  }
]

export const tagReducer = handleActions<RootState.TagState, TagModel>(
  {
    // [TagActions.Type.ADD_TAG]: (state, action) => {
    //   return state
    // },
    [TagActions.Type.GET_TAG]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = action.payload!
        return [ ...result, ...state ]
      }
      return state
    },
    // [TagActions.Type.DELETE_TAG]: (state, action) => {
    //   return state.filter(tag => tag._id !== (action.payload as any))
    // },
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
