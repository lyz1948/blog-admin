import React, { memo } from 'react'
import { Button } from 'antd'
import { Container } from './style'

function Login(props) {
  return (
    <Container>
      <div className="login-content">
        <h3>博客管理系统后台登录</h3>

        <div className="login-form">
          <p>用户名</p>
          <div className="input-wrapper">
            <input className="form-input" type="text" placeholder="用户名" />
          </div>

          <p>密码</p>
          <div className="input-wrapper">
            <input className="form-input" type="text" placeholder="密码" />
          </div>

          <div className="input-wrapper">
            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default memo(Login)
