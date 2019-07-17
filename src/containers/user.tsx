import * as React from 'react'
import { UserComp } from '../components'
import { UserActions } from '../store/actions'
import { RootState } from '../store/reducers'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import * as CONFIG from '../app.config'

export namespace User {
  export interface IProps extends RouteComponentProps<void> {
    user: RootState.UserState
    actions: UserActions
  }
}
@connect(
  (state: RootState, ownProps): Pick<User.IProps, 'user'> => {
    const { data } = state.user
    const now = Date.now()
    if (data) {
      data.expires_in = now + data.expires_in * 1000
      localStorage.setItem(CONFIG.APP.tokenKey, JSON.stringify(data))
      ownProps.history.push('#DASHBOARD')
    }
    return  { user: state.user }
  },
  (dispatch: Dispatch): Pick<User.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(UserActions, 'Type'), dispatch),
  }),
)

export class UserApp extends React.Component<User.IProps> {
  constructor(props: User.IProps, context?: any){
    super(props, context)

  }
  render() {
    const { user, actions } = this.props
    return (
      <UserComp user={user} onLogin={actions.signIn} />
    )
  }
}