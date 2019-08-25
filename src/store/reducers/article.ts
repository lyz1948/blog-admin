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
    [ArticleActions.Type.GET_ARTICLE]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { data } = (action.payload.result!)
        return [
          ...data,
        ]
      }
      return state
    },
    [ArticleActions.Type.ADD_ARTICLE]: (state, action) => {
      if (action.payload && action.payload.result) {
        return action.payload.result
      }
      return state
    },
    [ArticleActions.Type.DELETE_ARTICLE]: (state, action) => {
      if (action.payload && action.payload.result) {
        return state.filter(article => article._id !== (action.payload!.result))
      }
      return state
    },
    [ArticleActions.Type.EDIT_ARTICLE]: (state, action) => {
      return state.map(article => {
        if (!article || !action || !action.payload) {
          return article
        }
        return article._id === action.payload._id ? { ...article } : article
      })
    },
    [ArticleActions.Type.UPLOAD_ARTICLE_THUMB]: (state, action) => {
      if (action.payload && action.payload.result) {
        const { result } = (action.payload!)
        initialState[0].thumb = result
        return { ...initialState, ...{ thumb: result }, ...state }
      }
      return state
    },
  },
  initialState,
)