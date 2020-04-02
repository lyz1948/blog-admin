import React, { memo } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Avatar } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import { Container, NavItem, Profile } from './style'

const { SubMenu } = Menu

function Sidebar(props) {
  const handleClick = e => {
    console.log('click')
  }

  return (
    <Container>
      <Profile>
        <h1 className="brand">YKPINE</h1>
        <div className="avatar">
          <Avatar
            shape="square"
            size={128}
            src="https://avatars1.githubusercontent.com/u/15190827?s=60&v=4"
          />
        </div>
        <h3 className="slogan">生命不止，折腾不息！</h3>
      </Profile>
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1">
          <NavLink to="/dashboard" activeClassName="selected">
            <NavItem>仪表盘</NavItem>
          </NavLink>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <CreditCardOutlined />
              <span>文章</span>
            </span>
          }
        >
          <Menu.Item key="2">
            <NavLink exact to="/article/add">
              <NavItem>文章发布</NavItem>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink exact to="/article/list">
              <NavItem>文章管理</NavItem>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <CreditCardOutlined />
              <span>分类</span>
            </span>
          }
        >
          <Menu.Item key="4">
            <NavLink exact to="/category/add">
              <NavItem>分类添加</NavItem>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink exact to="/category/list">
              <NavItem>分类管理</NavItem>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="6">
          <NavLink to="/settings">
            <NavItem>全局设置</NavItem>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/login">
            <NavItem>登录</NavItem>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Container>
  )
}

export default memo(withRouter(Sidebar))
