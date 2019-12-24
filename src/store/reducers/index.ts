import { combineReducers } from 'redux'
import { RootState } from './state'
import { loginReducer } from './login'
import { siteReducer } from './site'
import { userReducer } from './user'
import { tagReducer } from './tag'
import { articleReducer } from './article'
import { categoryReducer } from './category'

export { RootState }

export const rootReducer = combineReducers({
  login: loginReducer as any,
  site: siteReducer as any,
  user: userReducer as any,
  articles: articleReducer as any,
  categories: categoryReducer as any,
  tags: tagReducer as any,
})
