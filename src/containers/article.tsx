import * as React from 'react'
// import * as styles from './style.css'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { RootState } from '../store/reducers'
import { ArticleModel } from '../store/models'
import { ArticleActions } from '../store/actions'
import { ArticleComp } from '../components/Article'

export namespace Article {
  export interface IProps extends RouteComponentProps<void> {
    articles: RootState.ArticleState
    actions: ArticleActions
    filter: ArticleModel.Filter
  }
}

@connect(
  (state: RootState, ownProps): Pick<Article.IProps, 'articles'> => {
    return  { articles: state.articles }
  },
  (dispatch: Dispatch): Pick<Article.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(ArticleActions, 'Type'), dispatch),
  }),
)

export class ArticleApp extends React.Component<Article.IProps> {
  static defaultProps: Partial<Article.IProps> = {
    filter: ArticleModel.Filter.SHOW_ALL,
  }

  constructor(props: Article.IProps, context?: any) {
    super(props, context)
  }

  render() {
    const { articles, actions } = this.props

    return (
      <ArticleComp
        articles={articles}
        getArticle={actions.getArticle}
        deleteArticle={actions.deleteArticle}
        editArticle={actions.editArticle}
      />
    )
  }
}
