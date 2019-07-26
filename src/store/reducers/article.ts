import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { ArticleModel } from '../models'
import { ArticleActions } from '../actions'

const initialState: RootState.ArticleState = [
  {
    _id: '',
    title: '测试标题',
    content: '测试内容',
    description: '测试描述',
    slug: 'test slug',
    author: 'john',
    tag: [],
    category: [],
    extends: [],
    keywords: [],
    meta: {},
    state: 1,
    public: 1,
    origin: 1,
    password: '',
    thumb: '',
  }
]

export const articleReducer = handleActions<RootState.ArticleState, ArticleModel>(
  {
    [ArticleActions.Type.ADD_ARTICLE]: (state, action) => {
      console.log('add articel action', action)
      return state
    },
    [ArticleActions.Type.GET_ARTICLE]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = (action.payload!)
        return [
          ...result.data,
        ]
      }
      return state
    },
    [ArticleActions.Type.DELETE_ARTICLE]: (state, action) => {
      return state.filter(article => article._id !== (action.payload as any))
    },
    [ArticleActions.Type.EDIT_ARTICLE]: (state, action) => {
      return state.map(article => {
        if (!article || !action || !action.payload) {
          return article
        }
        return article._id === action.payload._id ? { ...article } : article
      })
    }
  },
  initialState,
)