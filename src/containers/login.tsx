import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { Login } from '@app/components'
import { LoginActions } from '@app/store/actions'
import { RootState } from '@app/store/reducers'
import { omit } from '@app/utils'
import * as CONFIG from '@app/config/app.config'

export namespace Login {
  export interface IProps extends RouteComponentProps<void> {
    login: RootState.LoginState
    actions: LoginActions
  }
}
@connect(
  (state: RootState, ownProps): Pick<Login.IProps, 'login'> => {
    return { login: state.login }
  },
  (dispatch: Dispatch): Pick<Login.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(LoginActions, 'Type'), dispatch),
  }),
)
export class LoginApp extends React.Component<Login.IProps> {
  constructor(props: Login.IProps, context?: any) {
    super(props, context)
  }

  componentDidMount() {
    // 如果登录过来，直接进入后台
    let token = localStorage.getItem(CONFIG.APP.tokenKey) as any
    token = JSON.parse(token)

    if (token && token.expires_in > Date.now()) {
      this.props.history.push('/#DASHBOARD')
    }
  }

  render() {
    const { login, actions } = this.props

    if (login && login.access_token) {
      this.props.history.push('/#DASHBOARD')
      return null
    }
    return <Login token={login} onLogin={actions.signIn} />
  }
}
