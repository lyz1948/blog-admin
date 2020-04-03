import React, { memo, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Base64 } from 'js-base64'
import { Button } from 'antd'
import { Tips } from '../../utils'
import { Container } from './style'
import * as actionTypes from '../../store/actions/auth'

function Auth(props) {
  const { userInfo: userInfoImmutable } = props
  const { signinDispatch } = props

  const usernameRef = useRef('')
  const passwordRef = useRef('')

  let userInfo = userInfoImmutable.toJS()

  useEffect(() => {
    if (userInfo.access_token) {
      props.history.push(`/dashboard`)
      return
    }

    if (usernameRef.current.value && passwordRef.current.value) {
      Tips.error('用户名或密码错误！')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const handleSubmit = () => {
    const name = usernameRef.current.value
    let password = passwordRef.current.value

    if (!name) {
      Tips.warning('用户名不能缺少！')
      return
    }

    password = password ? Base64.encode(password) : ''

    if (!password) {
      Tips.warning('密码不能缺少！')
      return
    }

    const user = { name, password }
    signinDispatch(user)
  }

  const handleEnter = ev => {
    if (ev.keyCode === 13) {
      handleSubmit()
    }
  }

  return (
    <Container>
      <div className="login-content">
        <h3>博客管理系统后台登录</h3>

        <div className="login-form">
          <p>用户名</p>
          <div className="input-wrapper">
            <input
              className="form-input"
              type="text"
              placeholder="用户名"
              ref={usernameRef}
              onKeyDown={handleEnter}
            />
          </div>

          <p>密码</p>
          <div className="input-wrapper">
            <input
              className="form-input"
              type="password"
              placeholder="密码"
              ref={passwordRef}
              onKeyDown={handleEnter}
            />
          </div>

          <div className="input-wrapper">
            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleSubmit}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  userInfo: state.getIn(['auth', 'userInfo']),
  loading: state.getIn(['auth', 'loading']),
})

const mapDispatchToProps = dispatch => {
  return {
    signinDispatch(data) {
      dispatch(actionTypes.handleSignin(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Auth))
