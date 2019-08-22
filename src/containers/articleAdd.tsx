import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { RootState } from '../store/reducers'
import { ArticleModel } from '../store/models'
import { ArticleAddComp } from '../components'
import { ArticleActions } from '../store/actions'

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

export class ArticleAddApp extends React.Component<Article.IProps> {
  static defaultProps: Partial<Article.IProps> = {
    filter: ArticleModel.Filter.SHOW_ALL
  }

  constructor(props: Article.IProps, context?: any) {
    super(props, context)
    this.handleNewArticle = this.handleNewArticle.bind(this)
  }

  handleNewArticle(article: ArticleModel): any {
    const { thumb } = this.props.articles[0];
    article.thumb = thumb
    this.props.actions.addArticle(article)
  }

  render() {
    const { categories, tags, actions } = this.props
    
    return (
      <ArticleAddComp
        tags={tags}
        categories={categories}
        getTag={actions.getTag}
        getCategory={actions.getCategory}
        uploadThumb={actions.uplodThumb}
        addArticle={this.handleNewArticle}
      />
    )
  }
}
