import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Base64 } from 'js-base64'
import { Tips } from '../../utils'
import { Container } from './style'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import * as actionTypes from '../../store/actions/auth'
import * as CONFIG from '../../config/app.config'

function Auth(props) {
  const { userInfo: userInfoImmutable } = props
  const { signinDispatch } = props
  const layout = {
    wrapperCol: {
      span: 24,
    },
  }

  let userInfo = userInfoImmutable.toJS()
  let token = localStorage.getItem(CONFIG.APP.tokenKey)

  useEffect(() => {
    if (token) {
      directToDashboard()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    if (userInfo.access_token) {
      localStorage.setItem(CONFIG.APP.tokenKey, userInfo.access_token)
      directToDashboard()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const directToDashboard = () => {
    props.history.push(`/dashboard`)
    return
  }

  const onFinish = values => {
    let { username, password } = values
    password = password ? Base64.encode(password) : ''

    const user = { username, password }
    signinDispatch(user).then(res => {
      if (res) {
        directToDashboard()
      } else {
        Tips.error('用户名或密码错误！')
      }
    })
  }

  return (
    <Container>
      <div className="login-content">
        <h3>博客管理系统后台登录</h3>
        
        <div className="login-form">
          <Form
            {...layout}
            name="basic"
            size={"large"}
            initialValues={{
              username: 'admin',
            }}
            onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}>
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  userInfo: state.getIn(['auth', 'userInfo']),
})

const mapDispatchToProps = dispatch => {
  return {
    signinDispatch(data) {
      return dispatch(actionTypes.handleSignin(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Auth))
