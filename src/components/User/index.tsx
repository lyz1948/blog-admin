import * as React from 'react'
import * as styles from './style.css'
import { Form, Button } from 'react-bootstrap'
import { LoginInputComp } from '../LoginInput'
import { UserModel } from '@app/store/models'
import { UserActions } from '@app/store/actions'

export namespace UserComp {
  export interface IProps {
    user: UserModel
    onLogin: typeof UserActions.signIn
  }

  export interface IState {
    textType: string
    pwdType: string
  }
}

export class UserComp extends React.Component<UserComp.IProps, UserComp.IState> {
  constructor(props: UserComp.IProps, context?: any) {
    super(props, context)
    this.state = {
      textType: 'text',
      pwdType: 'password',
    }
    this.signIn = this.signIn.bind(this)
  }

  signIn() {
    this.props.onLogin(this.props.user)
  }

  render() {
    const { user } = this.props

    return (
      <div className={styles.userLogin}>
        <div className={styles.content}>
          <h2>博客后台管理系统</h2>
          <Form className={styles.userForm}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <LoginInputComp text={user.username} type={this.state.textType} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <LoginInputComp text={user.password} type={this.state.pwdType} />
            </Form.Group>
            <Button size="lg" variant="primary" block onClick={this.signIn}>
              登录
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
