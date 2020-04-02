import React, { memo } from 'react'
import { Container } from './style'
import { Avatar, Badge } from 'antd'
import { MenuFoldOutlined, NotificationOutlined } from '@ant-design/icons'
function Header(props) {
  return (
    <Container>
      <div className="head-wrapper">
        <div className="icon">
          <MenuFoldOutlined />
        </div>
        <div className="mate">
          <div className="mate-item">
            <Badge dot>
              <NotificationOutlined />
            </Badge>
          </div>
          <div className="mate-item">
            <Avatar
              size="small"
              src="https://avatars1.githubusercontent.com/u/15190827?s=60&v=4"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default memo(Header)
