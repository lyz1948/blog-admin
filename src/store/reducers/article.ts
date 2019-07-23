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
    public: 1,
    publish: 1,
    author: 'john',
    tag: [],
    category: [],
    extends: [],
    keywords: [],
    meta: {},
    origin: 1,
    password: '',
    state: 1,
    thumb: '',
  }
]

export const articleReducer = handleActions<RootState.ArticleState, ArticleModel>(
  {
    [ArticleActions.Type.ADD_ARTICLE]: (state, action) => {
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