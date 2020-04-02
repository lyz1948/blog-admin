import { combineReducers } from 'redux-immutable'

import { authReducer } from './login'
import { articleReducer } from './article'
import { categoryReducer } from './category'
import { settingsReducer } from './article'

export default combineReducers({
  auth: authReducer,
  article: articleReducer,
  category: categoryReducer,
  settings: settingsReducer,
})
