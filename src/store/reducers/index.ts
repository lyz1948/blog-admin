import { combineReducers } from 'redux'
import { RootState } from './state'
import { todoReducer } from './todos'
import { articleReducer } from './article'
import { userReducer } from './user'
import { categoryReducer } from './category'
import { tagReducer } from './tag'

export { RootState }

export const rootReducer = combineReducers({
  todos: todoReducer as any,
  user: userReducer as any,
  articles: articleReducer as any,
  categories: categoryReducer as any,
  tags: tagReducer as any,
})
