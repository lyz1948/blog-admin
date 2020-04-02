import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import { Container, Main, HeaderWrap, SideWrap } from './style'

function Layout(props) {
  const { route } = props
  return (
    <Container>
      <SideWrap>
        <Sidebar></Sidebar>
      </SideWrap>
      <Main>
        <HeaderWrap>
          <Header></Header>
        </HeaderWrap>
        {renderRoutes(route.routes)}
      </Main>
    </Container>
  )
}

export default memo(Layout)
