import * as React from 'react'
import * as styles from './style.css'
import * as CONFIG from '../app.config'

import { connect } from 'react-redux'
import { omit } from '../utils'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '../store/reducers'
import { NavModel } from '../store/models'

import { ArticleApp } from './article'
import { ArticleAddApp } from './articleAdd'
import { CategoryApp } from './category'
import { CategoryAddApp } from './categoryAdd'
import { TagApp } from './tag'
import { TagAddApp } from './tagAdd'

// component
import {
  NavComp,
  TopNavComp,
  DashboardComp,
} from '../components'
import { ArticleActions } from '../store/actions'

export namespace App {
  export interface IProps extends RouteComponentProps<void> {
    filter: NavModel.Filter
    actions: ArticleActions
    articles: RootState.ArticleState
    categories: RootState.CategoryState
    tags: RootState.TagState
  }
}

const FILTER_COMPONMENT = (Object.keys(
  NavModel.Filter
) as (keyof typeof NavModel.Filter)[]).map(comp => NavModel.Filter[comp])

@connect(
  (
    state: RootState,
    ownProps
  ): Pick<App.IProps, 'filter' | 'articles' | 'categories' | 'tags'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '')
    const filter =
      FILTER_COMPONMENT.find(value => value === hash) ||
      NavModel.Filter.DASHBOARD
    return {
      filter,
      articles: state.articles,
      categories: state.categories,
      tags: state.tags
    }
  },
  (dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(ArticleActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.IProps> {
  constructor(props: App.IProps, context?: any) {
    super(props, context)
    this.filterCompoent = this.filterCompoent.bind(this)
    this.hasPermission = this.hasPermission.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    this.hasPermission()
  }

  hasPermission() {
    let token = localStorage.getItem(CONFIG.APP.TOKEN_KEY) as any
    try {
      token = JSON.parse(token)
    } catch (error) {
      throw new Error(error)
    }

    // 凭证过期
    if (!token || token.expires_in < Date.now()) {
      localStorage.removeItem(CONFIG.APP.TOKEN_KEY)
      this.props.history.push('/login')
      return
    }
  }

  handleFilterChange(filter: NavModel.Filter): void {
    this.props.history.push(`#${filter}`)
  }

  filterCompoent(): JSX.Element | void {
    const { filter } = this.props
    console.log(filter)
    this.hasPermission()
    switch (filter) {
      case 'DASHBOARD':
        return <DashboardComp />
      
        case 'ARTICLE':
      case 'ARTICLE_MANAGE':
        return <ArticleApp />
      case 'ARTICLE_ADD':
        return <ArticleAddApp />

      case 'CATEGORY_MANAGE':
        return <CategoryApp />
      case 'CATEGORY_ADD':
        return <CategoryAddApp />

      case 'TAG':
      case 'TAG_MANAGE':
        return <TagApp />
      case 'TAG_ADD':
        return <TagAddApp />

      default:
        return <DashboardComp />
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <NavComp onClickFilter={this.handleFilterChange} />
        <div className={styles.main}>
          <TopNavComp />
          {this.filterCompoent()}
        </div>
      </div>
    )
  }
}
