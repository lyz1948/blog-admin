import * as React from 'react'
import * as styles from './style.css'
import * as CONFIG from '../app.config'

import { connect } from 'react-redux'
import { omit } from '../utils'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '../store/reducers'
import { NavModel } from '../store/models'

import {
  ArticleApp,
} from './article'
import {
  CategoryApp,
} from './category'
import {
  TagApp,
} from './tag'

// component
import {
  NavComp,
  TopNavComp,
  DashboardComp,
  ArticleAddComp,
} from '../components'
import { ArticleActions } from '../store/actions'

export namespace App {
  export interface IProps extends RouteComponentProps<void> {
    filter: NavModel.Filter
    actions: ArticleActions
    categories: RootState.CategoryState
    tags: RootState.TagState
  }
}

const FILTER_COMPONMENT = (Object.keys(
  NavModel.Filter,
) as (keyof typeof NavModel.Filter)[]).map(comp => NavModel.Filter[comp])

@connect(
  (state: RootState, ownProps): Pick<App.IProps, 'filter' | 'categories' | 'tags'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '')
    const filter =
      FILTER_COMPONMENT.find(value => value === hash) ||
      NavModel.Filter.DASHBOARD
    return { filter, categories: state.categories, tags: state.tags }
  },
  (dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(ArticleActions, 'Type'), dispatch),
  }),
)

export class App extends React.Component<App.IProps> {
  constructor(props: App.IProps, context?: any) {
    super(props, context)
    this.filterCompoent = this.filterCompoent.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    let token = localStorage.getItem(CONFIG.APP.tokenKey) as any

    try {
      token = JSON.parse(token)
    } catch (error) {
      throw new Error(error)
    }

    // 凭证过期
    if (!token || token.expires_in < Date.now()) {
      localStorage.removeItem(CONFIG.APP.tokenKey)
      this.props.history.push('/login')
    }
  }

  handleFilterChange(filter: NavModel.Filter): void {
    this.props.history.push(`#${filter}`)
  }

  filterCompoent(): JSX.Element | void {
    const { filter, actions, categories, tags } = this.props

    switch (filter) {
      case 'DASHBOARD':
        return <DashboardComp />
      case 'ARTICLE':
        return <ArticleApp />
      case 'ARTICLE_ADD':
        return <ArticleAddComp
        tags={tags}
        categories={categories}
        addArticle={actions.addArticle}
        getCategory={actions.getCategory}
        getTag={actions.getTag}/>
      case 'CATEGORY_MANAGE':
        return <CategoryApp />
      case 'TAG':
        return <TagApp />
      default:
        return <DashboardComp />
    }
  }

  render() {
    return (
      <div className="layout">
        <NavComp onClickFilter={this.handleFilterChange} />
        <div className={styles.main}>
          <TopNavComp />
          {this.filterCompoent()}
        </div>
      </div>
    )
  }
}
