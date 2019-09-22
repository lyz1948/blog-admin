import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { Login } from '../components'
import { LoginActions } from '../store/actions'
import { RootState } from '../store/reducers'
import { omit } from '../utils'

export namespace Login {
	export interface IProps extends RouteComponentProps<void> {
		login: RootState.LoginState
		actions: LoginActions
	}
}
@connect(
	(state: RootState, ownProps): Pick<Login.IProps, 'login'> => {
		console.log('state', state.login)
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

	render() {
		const { login, actions } = this.props
		if (login && login.access_token) {
			this.props.history.push('/#DASHBOARD')
			return null
		}
		return <Login token={login} onLogin={actions.signIn} />
	}
}
