import * as React from 'react'
import * as CONFIG from '../config/app.config'

import { connect } from 'react-redux'
import { omit } from '../utils'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '../store/reducers'
import { NavModel } from '../store/models'

import { ArticleApp } from './article'
import { ArticleAddApp } from './articleAdd'
import { CategoryApp } from './category'
import { TagApp } from './tag'

// component
import {
  NavComp,
  TopNavComp,
  DashboardComp,
} from '../components'
import { ArticleActions, UserActions } from '../store/actions'

export namespace App {
  export interface IProps extends RouteComponentProps<void> {
    filter: NavModel.Filter
    actions: ArticleActions
    articles: RootState.ArticleState
    categories: RootState.CategoryState
    tags: RootState.TagState
    user: RootState.UserState
    fetchUser: typeof UserActions.fetchUser
  }

  export interface IState {
    userinfo?: any
  }
}

const FILTER_COMPONMENT = (Object.keys(
  NavModel.Filter
) as (keyof typeof NavModel.Filter)[]).map(comp => NavModel.Filter[comp])

@connect(
  (
    state: RootState,
    ownProps
  ): Pick<App.IProps, 'filter' | 'articles' | 'categories' | 'tags' | 'user'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '')
    const filter =
      FILTER_COMPONMENT.find(value => value === hash) ||
      NavModel.Filter.DASHBOARD
    return {
      filter,
      user: state.user,
      articles: state.articles,
      categories: state.categories,
      tags: state.tags
    }
  },
  (dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(ArticleActions, 'Type'), dispatch)
  })
)

export class App extends React.Component<App.IProps, App.IState> {
  constructor(props: App.IProps, context?: any) {
    super(props, context)

    this.state = {
      userinfo: null
    }
    this.filterCompoent = this.filterCompoent.bind(this)
    this.hasPermission = this.hasPermission.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    this.hasPermission()
  }
  
  componentWillMount() {
    this.getUserInfoFromStorage()
  }

  hasPermission() {
    const { userinfo } = this.state
     // 凭证过期
     if (!userinfo || userinfo.expires_in < Date.now()) {
      localStorage.removeItem(CONFIG.APP.TOKEN_KEY)
      this.props.history.push('/login')
      return
    }
    // let token = localStorage.getItem(CONFIG.APP.TOKEN_KEY) as any
    // try {
    //   token = JSON.parse(token)
    // } catch (error) {
    //   throw new Error(error)
    // }

    // // 凭证过期
    // if (!token || token.expires_in < Date.now()) {
    //   localStorage.removeItem(CONFIG.APP.TOKEN_KEY)
    //   this.props.history.push('/login')
    //   return
    // }
   
  }

  handleFilterChange(filter: NavModel.Filter): void {
    this.props.history.push(`#${filter}`)
  }

  filterCompoent(): JSX.Element | void {
    const { filter } = this.props
    this.hasPermission()
    switch (filter) {
      case 'ARTICLE':
      case 'ARTICLE_LIST':
        return <ArticleApp />
      case 'ARTICLE_ADD':
        return <ArticleAddApp />
      case 'ARTICLE_CATEGORY':
        return <CategoryApp />
      case 'ARTICLE_TAG':
        return <TagApp />
      default:
        return <DashboardComp />
    }
  }

  getUserInfoFromStorage() {
    let token = localStorage.getItem(CONFIG.APP.TOKEN_KEY) as any
    try {
      token = JSON.parse(token)
    } catch (error) {
      throw new Error(error)
    }
    this.setState({
      userinfo: token
    })
  }

  render() {
    const { userinfo } = this.state
    return (
      <div className="home">
        <NavComp userinfo={userinfo} onClickFilter={this.handleFilterChange} />
        <div className="main">
          <TopNavComp />
          {this.filterCompoent()}
        </div>
      </div>
    )
  }
}
