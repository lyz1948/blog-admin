import * as actionTypes from '../constants/article'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  articleList: [],
  currentArticle: {},
})

export const articleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY_CREATE:
      return state.set('articleList', action.data)

    default:
      return state
  }
}