import React, { memo } from 'react'
import { Button, Avatar } from 'antd'
import { Container } from './style'

function Settings(props) {
  return (
    <Container className="flex">
      <div className="module flex-60">
        <div className="title">网站信息设置</div>

        <div className="content">
          <div className="input-wrapper">
            <div className="label">站点标题</div>
            <input className="form-input" type="text" placeholder="站点标题" />
          </div>

          <div className="input-wrapper">
            <div className="label">站点副标题</div>
            <input
              className="form-input"
              type="text"
              placeholder="站点副标题"
            />
          </div>

          <div className="input-wrapper">
            <div className="label">站点关键字</div>
            <input
              className="form-input"
              type="text"
              placeholder="站点关键字"
            />
          </div>

          <div className="input-wrapper">
            <div className="label">站点域名</div>
            <input className="form-input" type="text" placeholder="站点域名" />
          </div>

          <div className="input-wrapper">
            <div className="label">电子邮件</div>
            <input className="form-input" type="text" placeholder="电子邮件" />
          </div>

          <div className="input-wrapper">
            <div className="label">网站备案号</div>
            <input
              className="form-input"
              type="text"
              placeholder="网站备案号"
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
            ></textarea>
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
            ></textarea>
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
            ></textarea>
          </div>

          <div className="input-wrapper">
            <div className="label"></div>
            <Button type="primary" size={32}>
              发布
            </Button>
          </div>
        </div>
      </div>
      <div className="module flex-1">
        <div className="title">用户信息设置</div>
        <div className="content">

          <div className="input-wrapper">
            <div className="label">头像</div>
            <div className="avatar-wrapper">
              <Avatar
              shape="square"
              size={128}
              src="https://avatars1.githubusercontent.com/u/15190827?s=60&v=4"
            />
            </div>
          </div>

          <div className="input-wrapper">
            <div className="label">昵称</div>
            <input className="form-input" type="text" placeholder="昵称" />
          </div>

          <div className="input-wrapper">
            <div className="label">口号</div>
            <input className="form-input" type="text" placeholder="口号" />
          </div>

          <div className="input-wrapper">
            <div className="label">旧密码</div>
            <input className="form-input" type="text" placeholder="旧密码" />
          </div>

          <div className="input-wrapper">
            <div className="label">新密码</div>
            <input className="form-input" type="text" placeholder="新密码" />
          </div>

          <div className="input-wrapper">
            <div className="label"></div>
            <Button type="primary" size={32}>
              保存修改
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default memo(Settings)
