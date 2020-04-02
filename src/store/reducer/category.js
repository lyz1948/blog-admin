import * as actionTypes from '../constants/category'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  categoryList: [],
  currentCategory: {},
})

export const categoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY_CREATE:
      return state.set('categoryList', action.data)

    default:
      return state
  }
}
