import * as React from 'react'
import * as styles from './style.css'
import classNames from 'classnames'
import { Base64 } from 'js-base64'
import { Form, Button } from 'react-bootstrap'
import { LoginActions } from '@app/store/actions'
import { INotice } from '@app/interfaces/notice'
import { LoginModel } from '@app/store/models'
import { FancyInput, Notication } from '@app/components'

export namespace User {
  export interface IProps {
    token: LoginModel
    onLogin: typeof LoginActions.signIn
  }

  export interface IState {
    show: boolean
    type: string
    content: string
  }
}

export class Login extends React.Component<User.IProps, User.IState> {
  private inputName = React.createRef<HTMLInputElement>()
  private inputPassword = React.createRef<HTMLInputElement>()

  constructor(props: User.IProps, context?: any) {
    super(props, context)
    this.state = {
      show: false,
      type: 'info',
      content: '',
    }
    this.signIn = this.signIn.bind(this)
  }

  async signIn() {
    const name = this.inputName.current!.value
    let password = this.inputPassword.current!.value

    if (!name) {
      this.showNotice({ type: 'warn', content: '用户名不能为空' })
      return
    }

    if (!password) {
      this.showNotice({ type: 'warn', content: '密码不能为空' })
      return
    }

    password = password ? Base64.encode(password) : password
    // 提交登录
    const res = await this.props.onLogin({ name, password })

    const { access_token } = this.props.token

    if (!access_token || !res) {
      this.showNotice({ type: 'error', content: '用户名或密码错误' })
      return
    }
  }

  handleSignIn(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13) {
      this.signIn()
    }
  }

  showNotice(obj: INotice) {
    const { type, content } = obj
    this.setState({
      show: true,
      type,
      content,
    })
  }

  render() {
    const { show, type, content } = this.state
    return (
      <div className={classNames(styles.userLogin, 'posFull')}>
        <Notication
          show={show}
          type={type}
          content={content}
          onClose={() => {
            this.setState({ show: false })
          }}
          autohide
        />
        <div className={classNames(styles.content, 'posCenter')}>
          <h2>博客后台管理系统</h2>
          <Form className="userForm">
            <Form.Group>
              <Form.Label>用户名或手机号</Form.Label>
              <FancyInput
                ref={this.inputName}
                tip="请输入用户名"
                onPress={(e: any) => this.handleSignIn(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>密码</Form.Label>
              <FancyInput
                ref={this.inputPassword}
                tip="请输入密码"
                type="password"
                onPress={(e: any) => this.handleSignIn(e)}
              />
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
