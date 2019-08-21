import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { RootState } from '../store/reducers'
import { ArticleModel } from '../store/models'
import { ArticleActions } from '../store/actions'
import { ArticleComp } from '../components'

export namespace Article {
  export interface IProps extends RouteComponentProps<void> {
    tags: RootState.TagState
    articles: RootState.ArticleState
    categories: RootState.CategoryState
    actions: ArticleActions
    filter: ArticleModel.Filter
  }
}

@connect(
  (state: RootState, ownProps): Pick<Article.IProps, 'articles' | 'categories' | 'tags'> => {
    return { articles: state.articles, categories: state.categories, tags: state.tags }
  },
  (dispatch: Dispatch): Pick<Article.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(ArticleActions, 'Type'), dispatch)
  })
)

export class ArticleApp extends React.Component<Article.IProps> {
  static defaultProps: Partial<Article.IProps> = {
    filter: ArticleModel.Filter.SHOW_ALL
  }

  constructor(props: Article.IProps, context?: any) {
    super(props, context)
  }

  render() {
    const { articles, actions, tags } = this.props

    return (
      <ArticleComp
        tags={tags}
        articles={articles}
        getArticle={actions.getArticle}
        deleteArticle={actions.deleteArticle}
        editArticle={actions.editArticle}
      />
    )
  }
}
