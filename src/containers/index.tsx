import * as React from 'react'
import * as styles from './style.css'
import * as CONFIG from '../app.config'

import { connect } from 'react-redux'
// import { omit } from '../utils'
// import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '@app/store/reducers'
import { NavModel } from '../store/models'

import {
  ArticleApp,
} from './article'

// component
import {
  NavComp,
  TopNavComp,
  DashboardComp,
  ArticleAddComp,
} from '../components'

export namespace App {
  export interface IProps extends RouteComponentProps<void> {
    filter: NavModel.Filter
  }
}

const FILTER_COMPONMENT = (Object.keys(
  NavModel.Filter,
) as (keyof typeof NavModel.Filter)[]).map(comp => NavModel.Filter[comp])

@connect(
  (state: RootState, ownProps): Pick<App.IProps, 'filter'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '')
    const filter =
      FILTER_COMPONMENT.find(value => value === hash) ||
      NavModel.Filter.DASHBOARD
    return { filter }
  },
  // (dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
  //   actions: bindActionCreators(omit(DialogActions, 'Type'), dispatch),
  // }),
)
export class App extends React.Component<App.IProps> {
  constructor(props: App.IProps, context?: any) {
    super(props, context)
    this.filterCompoent = this.filterCompoent.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentWillMount() {
    let token = localStorage.getItem(CONFIG.APP.tokenKey) as any
    const now = Date.now()
    try {
      token = JSON.parse(token)
    } catch (error) {
      throw new Error(error)
    }

    // 凭证过期
    if (!token || token.expires_in < now) {
      localStorage.removeItem(CONFIG.APP.tokenKey)
      this.props.history.push('/login')
    }
  }

  handleFilterChange(filter: NavModel.Filter): void {
    this.props.history.push(`#${filter}`)
  }

  filterCompoent(): JSX.Element | void {
    const { filter } = this.props

    switch (filter) {
      case 'DASHBOARD':
        return <DashboardComp />
      case 'ARTICLE':
        return <ArticleApp />
      case 'ARTICLE_ADD':
        return <ArticleAddComp />
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
