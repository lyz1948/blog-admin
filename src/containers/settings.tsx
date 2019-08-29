import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '../store/reducers'
import { UserActions } from '../store/actions'
import { UserModel } from '../store/models'
import { omit } from '../utils'
import { Settings } from '../components'

export namespace UserSettings {
  export interface IProps extends RouteComponentProps<void> {
    user: RootState.UserState
    actions: UserActions
    filter: UserModel.Filter
  }
}

@connect(
  (state: RootState, ownProps): Pick<UserSettings.IProps, 'user'> => {
    return { user: state.user }
  },
  (dispatch: Dispatch): Pick<UserSettings.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(UserActions, 'Type'), dispatch),
  }),
)
export class SettingsApp extends React.Component<UserSettings.IProps> {
  static defaultProps: Partial<UserSettings.IProps> = {
    filter: UserModel.Filter.SHOW_USER,
  }

  constructor(props: UserSettings.IProps, context?: any) {
    super(props, context)
  }

  render() {
    const { user, actions } = this.props
    return (
    <Settings user={user} updateUser={actions.updateUser}/>
    )
  }
}
