import { combineReducers } from 'redux-immutable'

import { authReducer } from './auth'
import { articleReducer } from './article'
import { categoryReducer } from './category'
import { settingsReducer } from './settings'

export default combineReducers({
  auth: authReducer,
  article: articleReducer,
  category: categoryReducer,
  settings: settingsReducer,
})
