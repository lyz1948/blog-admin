import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { User as UserComp } from '../components'
import { UserActions } from '../store/actions'
import { RootState } from '../store/reducers'
import { omit } from '../utils'

export namespace User {
  export interface IProps extends RouteComponentProps<void> {
    user: RootState.UserState
    actions: UserActions
  }
}
@connect(
  (state: RootState, ownProps): Pick<User.IProps, 'user'> => {
    return { user: state.user }
  },
  (dispatch: Dispatch): Pick<User.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(UserActions, 'Type'), dispatch),
  }),
)

export class UserApp extends React.Component<User.IProps> {
  constructor(props: User.IProps, context?: any) {
    super(props, context)
  }

  render() {
    const { user, actions } = this.props
    if (user && user.data) {
      this.props.history.push('/#DASHBOARD')
      return null
    }
    return (
      <UserComp user={user} onLogin={actions.signIn} />
    )
  }
}
