import { combineReducers } from 'redux'
import { RootState } from './state'
import { todoReducer } from './todos'
import { articleReducer } from './article'
import { userReducer } from './user'

export { RootState }

export const rootReducer = combineReducers({
  todos: todoReducer as any,
  user: userReducer as any,
  articles: articleReducer as any,
})
