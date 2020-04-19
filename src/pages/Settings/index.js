import React, { memo, useRef, useEffect, useState } from 'react'
import { Button, Avatar } from 'antd'
import { connect } from 'react-redux'
import { Base64 } from 'js-base64'
import { UploadOutlined } from '@ant-design/icons'
import { Tips } from '../../utils'
import * as CONFIG from '../../config/app.config'
import { Container, UploadWrap } from './style'

import {
  getSiteInfo,
  getUserInfo,
  updateSiteInfo,
  updateUserInfo,
  uploadUserAvatar,
} from '../../store/actions/settings'

function Settings(props) {
  const {
    loading,
    avatarData,
    userInfo: userInfoImmutable,
    siteInfo: siteInfoImmutable,
  } = props
  const {
    getUserInfoDispatch,
    getSiteInfoDispatch,
    updateUserInfoDispatch,
    updateSiteInfoDispatch,
    uploadAvatarDispatch,
  } = props

  let userInfo = userInfoImmutable.toJS()
  let siteInfo = siteInfoImmutable.toJS()

  const titleRef = useRef()
  const subtitleRef = useRef()
  const keywordRef = useRef()
  const domainRef = useRef()
  const emailRef = useRef()
  const icpRef = useRef()
  const descRef = useRef()
  const ipBlackRef = useRef()
  const emailBlackRef = useRef()

  const nicknameRef = useRef()
  const sloganRef = useRef()
  const oldPwdRef = useRef()
  const newPwdRef = useRef()
  const newPwdConfirmRef = useRef()

  const [thumb, setThumb] = useState(null)

  useEffect(() => {
    getUserInfoDispatch()
    getSiteInfoDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (siteInfo) {
      const {
        title,
        sub_title,
        keywords,
        description,
        email,
        domain,
        icp,
        blacklist,
      } = siteInfo
      titleRef.current.value = title
      subtitleRef.current.value = sub_title
      keywordRef.current.value = keywords
      domainRef.current.value = domain
      emailRef.current.value = email
      icpRef.current.value = icp
      descRef.current.value = description
      ipBlackRef.current.value = blacklist ? blacklist.ips : []
      emailBlackRef.current.value = blacklist ? blacklist.mails : []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteInfo])

  useEffect(() => {
    if (siteInfo) {
      const { name, slogan } = userInfo
      nicknameRef.current.value = name
      sloganRef.current.value = slogan
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  useEffect(() => {
    avatarData && setThumb(CONFIG.APP.baseUrl + avatarData.path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarData])

  const updateSiteInfo = () => {
    const siteData = {}
    updateSiteInfoDispatch(siteData)
  }

  const handleUserInfoUpdate = () => {
    let { value: name } = nicknameRef.current
    let { value: slogan } = sloganRef.current
    let { value: password } = oldPwdRef.current
    let { value: passwordNew } = newPwdRef.current
    let { value: passwordConfirm } = newPwdConfirmRef.current

    if (!name) {
      Tips.warning('昵称未填写!')
      return
    }

    if (!slogan) {
      Tips.warning('口号未填写!')
      return
    }

    if (!password) {
      Tips.warning('旧密码未填写!')
      return
    }

    if (!passwordNew) {
      Tips.warning('新密码未输入！')
      return
    }

    if (!passwordConfirm) {
      Tips.warning('确认密码未输入！')
      return
    }

    if (passwordNew.length !== passwordConfirm.length) {
      Tips.warning('两次密码不一样')
      return
    }

    password = password ? Base64.encode(password) : password
    passwordNew = passwordNew ? Base64.encode(passwordNew) : passwordNew
    passwordConfirm = passwordConfirm
      ? Base64.encode(passwordConfirm)
      : passwordConfirm

    const userData = {
      name,
      slogan,
      avatar: thumb,
      password,
      password_new: passwordNew,
    }
    updateUserInfoDispatch(userData)
  }

  const changeSiteInput = (title, event) => {
    console.log(event)
  }

  const handleAvatarUpload = () => {
    const fd = new FormData()
    const fileEl = document.getElementById('avatarUpload')

    if (fileEl.files) {
      setThumb(URL.createObjectURL(fileEl.files[0]))

      fd.append('image', fileEl.files[0])
      uploadAvatarDispatch(userInfo._id, fd)
    }
  }

  return (
    <Container className="flex">
      <div className="module flex-60">
        <div className="title">网站信息设置</div>

        <div className="content">
          <div className="input-wrapper">
            <div className="label">站点标题</div>
            <input
              className="form-input"
              type="text"
              placeholder="站点标题"
              ref={titleRef}
              onChange={e => changeSiteInput(e)}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">站点副标题</div>
            <input
              className="form-input"
              type="text"
              placeholder="站点副标题"
              ref={subtitleRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">站点关键字</div>
            <input
              className="form-input"
              type="text"
              placeholder="站点关键字"
              ref={keywordRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">站点域名</div>
            <input
              className="form-input"
              type="text"
              placeholder="站点域名"
              ref={domainRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">电子邮件</div>
            <input
              className="form-input"
              type="text"
              placeholder="电子邮件"
              ref={emailRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">网站备案号</div>
            <input
              className="form-input"
              type="text"
              placeholder="网站备案号"
              ref={icpRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">站点描述</div>
            <textarea
              className="text-area"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="站点描述"
              ref={descRef}></textarea>
          </div>

          <div className="input-wrapper">
            <div className="label">黑名单-IP</div>
            <textarea
              className="text-area"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="192.168.0.1"
              ref={ipBlackRef}></textarea>
          </div>

          <div className="input-wrapper">
            <div className="label">黑名单-邮箱</div>
            <textarea
              className="text-area"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="admin@ykpine.com"
              ref={emailBlackRef}></textarea>
          </div>

          <div className="input-wrapper">
            <div className="label"></div>
            <Button type="primary" size={32} onClick={updateSiteInfo}>
              保存修改
            </Button>
          </div>
        </div>
      </div>
      <div className="module flex-1">
        <div className="title">用户信息设置</div>
        <div className="content">
          <div className="input-wrapper">
            <div className="label">头像</div>
            <UploadWrap>
              <input
                type="file"
                id="avatarUpload"
                onChange={handleAvatarUpload}
              />
              <div className="thumb">
                {thumb ? (
                  <Avatar size={128} src={thumb} shape="square" />
                ) : (
                  <UploadOutlined className="icon" />
                )}
              </div>
            </UploadWrap>
          </div>

          <div className="input-wrapper">
            <div className="label">昵称</div>
            <input
              className="form-input"
              type="text"
              placeholder="昵称"
              ref={nicknameRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">口号</div>
            <input
              className="form-input"
              type="text"
              placeholder="口号"
              ref={sloganRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">旧密码</div>
            <input
              className="form-input"
              type="password"
              placeholder="旧密码"
              ref={oldPwdRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">新密码</div>
            <input
              className="form-input"
              type="password"
              placeholder="新密码"
              ref={newPwdRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label">确认新密码</div>
            <input
              className="form-input"
              type="password"
              placeholder="新密码"
              ref={newPwdConfirmRef}
            />
          </div>

          <div className="input-wrapper">
            <div className="label"></div>
            <Button type="primary" size={32} onClick={handleUserInfoUpdate}>
              保存修改
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  loading: state.getIn(['settings', 'loading']),
  avatarData: state.getIn(['settings', 'avatarData']),
  userInfo: state.getIn(['settings', 'userInfo']),
  siteInfo: state.getIn(['settings', 'siteInfo']),
})

const mapDispatchToProps = dispatch => {
  return {
    getSiteInfoDispatch() {
      dispatch(getSiteInfo())
    },
    updateSiteInfoDispatch(data) {
      dispatch(updateSiteInfo(data))
    },
    getUserInfoDispatch() {
      dispatch(getUserInfo())
    },
    updateUserInfoDispatch(data) {
      dispatch(updateUserInfo(data))
    },
    uploadAvatarDispatch(data) {
      dispatch(uploadUserAvatar(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Settings))
